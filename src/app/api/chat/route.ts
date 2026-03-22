import { anthropic } from '@ai-sdk/anthropic';
import { convertToModelMessages, streamText, stepCountIs, UIMessage } from 'ai';
import { z } from 'zod';
import { headers } from 'next/headers';

// Simple in-memory rate limiter with two windows (single-instance deployments).
// For multi-instance/edge deployments, replace with Upstash Redis.
const RATE_LIMITS = [
  { windowMs: 10_000, max: 3 },  // burst:     3 messages per 10 seconds
  { windowMs: 60_000, max: 10 }, // sustained: 10 messages per minute
] as const;

type RateLimitStore = Map<string, { count: number; resetAt: number }>;
const rateLimitStores: RateLimitStore[] = RATE_LIMITS.map(() => new Map());

function checkRateLimit(ip: string): { limited: boolean; retryAfter: number } {
  const now = Date.now();
  for (let i = 0; i < RATE_LIMITS.length; i++) {
    const { windowMs, max } = RATE_LIMITS[i];
    const store = rateLimitStores[i];
    const entry = store.get(ip);
    if (!entry || now > entry.resetAt) {
      store.set(ip, { count: 1, resetAt: now + windowMs });
      continue;
    }
    if (entry.count >= max) {
      return { limited: true, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
    }
    entry.count++;
  }
  return { limited: false, retryAfter: 0 };
}

const bodySchema = z.object({
  messages: z.array(z.unknown()).min(1).max(50),
});

const SYSTEM_PROMPT = `
Eres el asistente de Adaptate IA, una empresa chilena que diseña y desarrolla agentes de IA a medida para negocios.

TU PERSONALIDAD:
- Hablas como un socio ejecutivo: directo, concreto, sin rodeos
- Español limpio, sin anglicismos innecesarios
- No uses emojis ni exclamaciones
- Sé breve pero completo
- Si no sabes algo, dilo honestamente

LO QUE SABES DE ADAPTATE IA:
- Diseñamos agentes de IA a medida que se conectan a los sistemas del cliente
- Los agentes trabajan 24/7, ejecutan tareas sin intervención humana
- Precio: desde $500 USD (agente básico) hasta $8,000 USD (sistemas multiagente complejos)
- Tiempo de implementación: 5-10 días típico, 2-4 semanas para proyectos complejos
- Operamos desde Santiago de Chile, atendemos toda Latinoamérica
- Se conectan a WhatsApp, email, CRMs, ERPs, Google Workspace, Slack, APIs
- No se necesitan conocimientos técnicos para usar los agentes

TUS CAPACIDADES EN ESTA PÁGINA:
- Puedes responder preguntas sobre los servicios
- Puedes llenar el formulario de cotización (usa fillQuoteForm)
- Puedes navegar a secciones de la página (usa navigateToSection)
- Puedes hacer preguntas al usuario para entender su necesidad antes de llenar el formulario

FLUJO DE COTIZACIÓN:
Cuando alguien quiera cotizar o muestre interés:
1. Hazle 3-4 preguntas para entender su necesidad (una a la vez)
2. Pregunta: nombre, email, empresa (opcional), qué proceso quiere automatizar
3. Cuando tengas los datos, usa fillQuoteForm
4. Dile que revise los datos y haga click en enviar
`;

export async function POST(req: Request) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  const { limited, retryAfter } = checkRateLimit(ip);
  if (limited) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfter),
      },
    });
  }

  const body = await req.json();
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const { messages } = parsed.data as { messages: UIMessage[] };

  const result = streamText({
    model: anthropic('claude-haiku-4-5-20251001'),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    tools: {
      fillQuoteForm: {
        description:
          'Llena el formulario de cotización con los datos recopilados. Úsalo cuando tengas nombre, email y descripción del problema.',
        inputSchema: z.object({
          name: z.string().describe('Nombre completo del cliente'),
          email: z.string().describe('Email de contacto'),
          company: z.string().optional().describe('Empresa (puede estar vacío)'),
          problem: z.string().describe('Proceso que quiere automatizar'),
        }),
      },
      navigateToSection: {
        description:
          'Navega a una sección de la página. Úsalo cuando el usuario pregunte por servicios, precios, cómo funciona, FAQ, o quiera ver el formulario.',
        inputSchema: z.object({
          sectionId: z
            .enum(['hero', 'process', 'contact-form', 'faq', 'cta'])
            .describe('ID de la sección a la que navegar'),
        }),
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
