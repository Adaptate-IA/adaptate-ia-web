# Adaptate IA — Guía de Implementación Paso a Paso

Documento para que Claude Code implemente el sitio web completo de Adaptate IA.
Lee este documento COMPLETO antes de escribir una sola línea de código.
**Lee también DESIGN.md** — contiene el sistema de diseño completo (colores, tipografía, componentes, animaciones, voz). Este documento tiene el paso a paso técnico; DESIGN.md tiene las decisiones visuales.

---

## CONTEXTO DEL PROYECTO

**Adaptate IA** es una empresa chilena que vende equipos de agentes de IA (sistemas multiagente orquestados) a negocios. El nombre suena como "Adáptate ya" — un llamado a la acción. La frase guía es de Darwin: "No sobrevive el más fuerte ni el más inteligente, sino el que mejor se adapta al cambio."

**Verticales prioritarias** (en orden):
1. Legal — agentes para estudios jurídicos
2. Construcción — agentes para constructoras
3. Inmobiliaria — agentes para corredoras

**Lo que el sitio debe lograr:**
- Posicionar a Adaptate IA como proveedor de agentes de IA en Chile/LATAM
- Recibir solicitudes de cotización y responder automáticamente con un PDF personalizado por email en < 2 minutos
- Tener un agente de IA embebido que interactúe con la UI (llene formularios, muestre opciones clickeables, navegue)
- Rankear en SEO clásico y en GEO (que LLMs como ChatGPT, Claude, Perplexity recomienden Adaptate IA)

**Estética:** oscura, limpia, inevitable. Blanco puro (#ffffff) como accent sobre negro (#0a0a0a). Paleta 100% grayscale — sin color. Tipografía Space Mono + Outfit. Border-radius 6px. Inspiración Linear.app. Mobile-first. Lee DESIGN.md para el sistema de diseño completo.

---

## ARQUITECTURA GENERAL

```
Browser (usuario)
  └── Next.js 15 App Router (Vercel)
        ├── Páginas SSR (SEO/GEO) — Server Components
        ├── CopilotKit v1.53 (agente UI) — Client Components
        │     └── <CopilotPopup> con acciones: llenar forms, navegar, mostrar opciones
        │
        └── API Routes
              ├── /api/copilotkit → CopilotRuntime + AnthropicAdapter
              └── /api/quote → proxy a FastAPI backend

FastAPI Backend (servidor propio, Docker)
  ├── /copilotkit → CopilotKitSDK con agentes LangGraph
  ├── /quote → Agente de cotizaciones
  │     └── Genera PDF → Envía por email (Resend) → Notifica por Telegram
  └── Anthropic API (Claude) para generación
```

**Decisión clave: CopilotKit SIN Vercel AI SDK.** CopilotKit maneja todo el chat y las acciones UI. No se usa AI SDK (son redundantes para este caso). Se conecta directo a Anthropic via AnthropicAdapter.

---

## STACK TECNOLÓGICO — VERSIONES EXACTAS

### Frontend
```json
{
  "next": "^15.1.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "@copilotkit/react-core": "^1.53.0",
  "@copilotkit/react-ui": "^1.53.0",
  "@copilotkit/runtime": "^1.53.0",
  "@anthropic-ai/sdk": "^0.39.0",
  "tailwindcss": "^4.0.0",
  "typescript": "^5.7.0",
  "zod": "^3.24.0",
  "lucide-react": "^0.468.0"
}
```

### Backend (Python)
```
fastapi>=0.115.0
uvicorn>=0.34.0
copilotkit>=0.1.79
langgraph>=0.3.25
langchain-anthropic>=0.3.0
resend>=2.25.0
python-telegram-bot>=21.0
weasyprint>=63.0  # Para generar PDFs
pydantic>=2.10.0
```

### Hosting
- Frontend: **Vercel** (plan free) — deploy desde GitHub
- Backend: **Servidor propio** (Ubuntu + Docker) o **Railway/Render** como alternativa
- Dominio: **adaptateia.cl** (inmediato) + **adaptateia.com** (mediano plazo)
- Email: **Resend** (3,000 emails/mes gratis, soporta PDF attachments)

---

## FASE 1: SETUP DEL PROYECTO NEXT.JS

### Step 1.1 — Crear el proyecto

```bash
npx create-next-app@latest adaptate-ia-web --typescript --tailwind --app --src-dir --import-alias "@/*"
cd adaptate-ia-web
```

### Step 1.2 — Instalar dependencias

```bash
# CopilotKit
npm install @copilotkit/react-core @copilotkit/react-ui @copilotkit/runtime

# Anthropic SDK (para el runtime)
npm install @anthropic-ai/sdk

# Utilidades
npm install zod lucide-react
```

### Step 1.3 — Variables de entorno

Crear `.env.local`:
```bash
ANTHROPIC_API_KEY=sk-ant-...
BACKEND_URL=http://localhost:8000
RESEND_API_KEY=re_...
```

IMPORTANTE: NO usar `NEXT_PUBLIC_` para API keys. Solo el runtime URL puede ser público.

### Step 1.4 — Configurar next.config.ts

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/py/:path*',
        destination: `${process.env.BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
```

### Step 1.5 — Estructura de carpetas

Crear esta estructura exacta:
```
src/
├── app/
│   ├── layout.tsx                    # Root layout (Server Component)
│   ├── page.tsx                      # Landing principal (Server Component)
│   ├── industrias/
│   │   └── legal/
│   │       └── page.tsx              # Vertical Legal (Server Component)
│   ├── blog/
│   │   ├── page.tsx                  # Lista de posts
│   │   └── [slug]/
│   │       └── page.tsx              # Post individual
│   ├── api/
│   │   ├── copilotkit/
│   │   │   └── route.ts             # CopilotKit runtime endpoint
│   │   └── quote/
│   │       └── route.ts             # Proxy cotización → FastAPI
│   ├── sitemap.ts                    # Sitemap dinámico
│   └── robots.ts                     # robots.txt dinámico
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Server Component
│   │   └── Footer.tsx                # Server Component
│   ├── sections/                     # Secciones de la landing
│   │   ├── Hero.tsx
│   │   ├── Problem.tsx
│   │   ├── Solution.tsx
│   │   ├── Industries.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── FAQ.tsx
│   │   └── CTA.tsx
│   ├── copilot/
│   │   ├── CopilotProvider.tsx       # 'use client' — wrapper del provider
│   │   ├── CopilotActions.tsx        # 'use client' — acciones registradas
│   │   └── QuoteFormWithCopilot.tsx  # 'use client' — formulario interactivo
│   ├── ui/                           # Componentes base reutilizables
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   └── seo/
│       └── JsonLd.tsx                # Server Component para structured data
├── lib/
│   ├── constants.ts                  # Colores, textos, config
│   └── types.ts                      # TypeScript types
├── content/
│   └── blog/                         # Archivos .mdx o .json para blog posts
└── styles/
    └── globals.css
public/
├── llms.txt
└── images/
    └── og-image.jpg                  # 1200x630 para Open Graph
```

---

## FASE 2: LAYOUT BASE, DISEÑO Y SECCIONES

### Step 2.1 — Colores y tipografía en globals.css

```css
/* src/styles/globals.css */
@import "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@300;400;500;600;700&display=swap');

:root {
  --void: #0a0a0a;
  --charcoal: #1a1a1a;
  --graphite: #2a2a2a;
  --stone: #555555;
  --ash: #888888;
  --warm-white: #f0efe9;
  --pure-white: #ffffff;
}

body {
  background-color: var(--void);
  color: var(--warm-white);
  font-family: 'Outfit', sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

### Step 2.1b — Tailwind config con design tokens

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'void': '#0a0a0a',
        'charcoal': '#1a1a1a',
        'graphite': '#2a2a2a',
        'stone': '#555555',
        'ash': '#888888',
        'warm-white': '#f0efe9',
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        sans: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(2.8rem, 7vw, 6rem)',
        'section': 'clamp(1.8rem, 4vw, 3rem)',
        'tag': '0.7rem',
      },
      borderRadius: {
        DEFAULT: '6px',
      },
    },
  },
  plugins: [],
};

export default config;
```

### Step 2.2 — Root Layout (Server Component)

```tsx
// src/app/layout.tsx — NO poner 'use client'
import type { Metadata } from 'next';
import { CopilotProvider } from '@/components/copilot/CopilotProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Adaptate IA — Agentes de Inteligencia Artificial para Negocios | Chile',
    template: '%s | Adaptate IA',
  },
  description: 'Implementamos equipos de agentes de IA multiagente para negocios en Chile y Latinoamérica. Automatización inteligente para estudios jurídicos, constructoras, inmobiliarias y más.',
  metadataBase: new URL('https://adaptateia.cl'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Adaptate IA',
    title: 'Adaptate IA — Equipos de IA para tu Negocio',
    description: 'Sistemas multiagente que funcionan como gerencias virtuales. Chile y Latinoamérica.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Adaptate IA',
  description: 'Empresa chilena especializada en implementación de equipos de agentes de inteligencia artificial multiagente para negocios.',
  url: 'https://adaptateia.cl',
  areaServed: ['Chile', 'Latinoamérica'],
  knowsAbout: [
    'Agentes de IA', 'Sistemas multiagente', 'Automatización con IA',
    'LegalTech', 'IA para construcción', 'IA para inmobiliarias',
  ],
  slogan: 'No sobrevive el más fuerte, sino el que mejor se adapta al cambio',
  foundingLocation: 'Santiago, Chile',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <JsonLd data={organizationJsonLd} />
        <CopilotProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CopilotProvider>
      </body>
    </html>
  );
}
```

### Step 2.3 — CopilotProvider (Client Component)

```tsx
// src/components/copilot/CopilotProvider.tsx
'use client';

import { CopilotKit } from '@copilotkit/react-core';
import { CopilotPopup } from '@copilotkit/react-ui';
import '@copilotkit/react-ui/styles.css';

export function CopilotProvider({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      {children}
      <CopilotPopup
        instructions={`
          Eres el asistente de Adaptate IA, una empresa chilena que implementa equipos de agentes de IA para negocios.
          
          Tu rol en esta página:
          - Responder preguntas sobre los servicios de Adaptate IA
          - Ayudar al usuario a llenar el formulario de cotización si lo pide
          - Cuando el usuario quiera cotizar, usa la acción fillQuoteForm para recopilar sus datos
          - Siempre responde en español
          - Sé directo, concreto, sin jerga técnica innecesaria
          - Si el usuario pregunta por precios, explica que depende del proyecto y ofrece llenar el formulario para una cotización personalizada en menos de 2 minutos
          
          Industrias donde Adaptate IA opera: Legal (estudios jurídicos), Construcción (constructoras), Inmobiliaria (corredoras).
        `}
        labels={{
          title: 'Asistente Adaptate IA',
          initial: '¡Hola! Soy el asistente de Adaptate IA. ¿En qué puedo ayudarte? Puedo contarte sobre nuestros servicios o ayudarte a solicitar una cotización.',
          placeholder: 'Escribe tu pregunta...',
        }}
      />
    </CopilotKit>
  );
}
```

### Step 2.4 — CopilotKit API Route

```typescript
// src/app/api/copilotkit/route.ts
import { CopilotRuntime, AnthropicAdapter } from '@copilotkit/runtime';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const serviceAdapter = new AnthropicAdapter({
  anthropic,
  model: 'claude-sonnet-4-5-20250929',
});

const runtime = new CopilotRuntime({
  // Cuando tengas el backend Python listo, descomentar:
  // remoteEndpoints: [
  //   { url: `${process.env.BACKEND_URL}/copilotkit` },
  // ],
});

export const POST = async (req: Request) => {
  const { handleRequest } = runtime;
  return handleRequest(req, serviceAdapter);
};
```

### Step 2.5 — JsonLd Component (Server Component)

```tsx
// src/components/seo/JsonLd.tsx — NO poner 'use client'
export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

### Step 2.6 — Landing Page

La landing page (`src/app/page.tsx`) debe ser un **Server Component** que importa las secciones. Cada sección es un componente separado. Las secciones que usan hooks de CopilotKit tienen `'use client'`, el resto son Server Components para máximo SEO.

```tsx
// src/app/page.tsx — NO poner 'use client'
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Solution } from '@/components/sections/Solution';
import { Industries } from '@/components/sections/Industries';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { FAQ } from '@/components/sections/FAQ';
import { CTA } from '@/components/sections/CTA';
import { QuoteFormWithCopilot } from '@/components/copilot/QuoteFormWithCopilot';
import { JsonLd } from '@/components/seo/JsonLd';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es un equipo de agentes de IA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un equipo de agentes de IA es un sistema multiagente donde múltiples agentes especializados trabajan coordinados por un orquestador central. Cada agente domina un área específica (investigación, redacción, análisis, comunicación) y colaboran para ejecutar tareas complejas de forma autónoma, 24/7.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta implementar agentes de IA para mi negocio en Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El costo depende del tipo de agente y la complejidad. Las implementaciones parten desde 500 USD. Ofrecemos una cotización personalizada gratuita en menos de 2 minutos completando nuestro formulario.',
      },
    },
    {
      '@type': 'Question',
      name: '¿En qué industrias trabaja Adaptate IA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Actualmente operamos en el sector legal (estudios jurídicos), construcción (constructoras) e inmobiliaria (corredoras). Implementamos agentes especializados para cada industria desde Santiago de Chile, atendiendo toda Latinoamérica.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Necesito conocimientos técnicos para usar los agentes de IA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Los sistemas se diseñan para que interactúes en lenguaje natural por WhatsApp, Telegram o chat web. Escribes o envías audio como si hablaras con un colega, y el sistema ejecuta las tareas.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <Hero />
      <Problem />
      <Solution />
      <Industries />
      <HowItWorks />
      <QuoteFormWithCopilot />
      <FAQ />
      <CTA />
    </>
  );
}
```

### Step 2.7 — Contenido de las secciones

Cada sección debe seguir estas reglas para SEO/GEO:
- Usar tags semánticos (`<section>`, `<article>`, `<h2>`, `<h3>`)
- Cada sección responde una pregunta implícita (GEO: los LLMs extraen respuestas autocontenidas)
- Incluir keywords naturales: "agentes de IA", "Chile", "automatización", "multiagente", la industria específica
- Las secciones que NO tienen interactividad deben ser Server Components (sin `'use client'`)

**HERO** — Tagline: "Tu próximo equipo no es humano." Subtítulo que explica qué hace Adaptate IA. CTA primario: "Probar el CMO Virtual →" (scroll al form). CTA secundario: "Conocer más" (scroll a sección). Fondo Void Black limpio con grid sutil blanco al 3% de opacidad. Cita de Darwin en esquina inferior derecha.

**PROBLEM** — Pain points: "¿Tu equipo dedica horas a tareas que un sistema inteligente podría resolver?" 3-4 problemas concretos sin jerga técnica.

**SOLUTION** — Qué es un equipo de agentes de IA en palabras simples. Diagrama visual del orquestador + agentes especialistas.

**INDUSTRIES** — Cards para Legal, Construcción, Inmobiliaria. Cada card: icono, título, 2-3 líneas de qué agente se ofrece, link a la sub-ruta `/industrias/legal`. Incluir "Próximamente" para industrias futuras.

**HOW IT WORKS** — 3 pasos: Diagnóstico → Configuración → Activación. Tiempo estimado: 5-7 días.

**QUOTE FORM** — Este es un Client Component con CopilotKit. Ver Step 3.

**FAQ** — Preguntas y respuestas visibles en la página (no solo en JSON-LD). Accordion. Mismas Q&A que el JSON-LD de arriba + más.

**CTA** — Sección final con imagen de fondo (manos en dots) y call to action. "¿Listo para adaptarte?"

---

## FASE 3: FORMULARIO DE COTIZACIÓN CON COPILOTKIT

Este es el componente más importante del sitio. El formulario tiene dos modos:
1. El usuario lo llena manualmente
2. El usuario le pide al agente "llena el formulario" y el agente recopila datos via chat interactivo y luego llena los campos

### Step 3.1 — QuoteFormWithCopilot

```tsx
// src/components/copilot/QuoteFormWithCopilot.tsx
'use client';

import { useState } from 'react';
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  problem: string;
}

const initialFormData: FormData = {
  name: '', email: '', phone: '', company: '', industry: '', problem: '',
};

export function QuoteFormWithCopilot() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Exponer estado del formulario al agente
  useCopilotReadable({
    description: 'Estado actual del formulario de cotización. Si tiene campos vacíos, el agente debería preguntar por ellos.',
    value: JSON.stringify(formData),
  });

  // Acción: el agente puede llenar el formulario
  useCopilotAction({
    name: 'fillQuoteForm',
    description: 'Llena el formulario de cotización con los datos que el usuario proporcionó en el chat. Usa esta acción cuando el usuario quiera solicitar una cotización o cuando diga algo como "llena el formulario", "quiero cotizar", "me interesa".',
    parameters: [
      { name: 'name', type: 'string', description: 'Nombre completo del usuario', required: true },
      { name: 'email', type: 'string', description: 'Email de contacto', required: true },
      { name: 'phone', type: 'string', description: 'Teléfono (opcional)', required: false },
      { name: 'company', type: 'string', description: 'Nombre de la empresa o estudio', required: false },
      { name: 'industry', type: 'string', description: 'Industria: legal, construcción, inmobiliaria u otra', required: true },
      { name: 'problem', type: 'string', description: 'Descripción del problema o necesidad que quieren resolver con IA', required: true },
    ],
    handler: async ({ name, email, phone, company, industry, problem }) => {
      setFormData({
        name: name || '',
        email: email || '',
        phone: phone || '',
        company: company || '',
        industry: industry || '',
        problem: problem || '',
      });
      // Scroll al formulario para que el usuario vea que se llenó
      document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' });
      return 'Formulario llenado. El usuario puede revisar los datos y hacer click en "Enviar cotización".';
    },
  });

  // Acción: navegar a una sección
  useCopilotAction({
    name: 'navigateToSection',
    description: 'Navega a una sección específica de la página. Usa esto cuando el usuario pregunte por servicios, industrias, precios, o cómo funciona.',
    parameters: [
      { name: 'sectionId', type: 'string', description: 'ID de la sección: hero, problem, solution, industries, how-it-works, quote-form, faq, cta' },
    ],
    handler: async ({ sectionId }) => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      return `Navegando a la sección ${sectionId}`;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('sent');
        setFormData(initialFormData);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="quote-form" className="py-24 px-6 border-t border-[var(--gray-2)]">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-white/50 mb-4">
          // Cotización gratuita
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Recibe una propuesta personalizada en minutos
        </h2>
        <p className="text-[var(--gray-3)] mb-8">
          Completa el formulario o pídeselo a nuestro agente en el chat.
          Recibirás una cotización por email en menos de 2 minutos.
        </p>

        {status === 'sent' ? (
          <div className="p-8 border border-white text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              ¡Cotización enviada!
            </h3>
            <p className="text-[var(--gray-3)]">
              Revisa tu email en los próximos minutos. Si no lo ves, revisa spam.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Renderizar campos del formulario aquí */}
            {/* Cada campo: <input> con value={formData.X} onChange={(e) => setFormData({...formData, X: e.target.value})} */}
            {/* Campos: name, email, phone, company, industry (select), problem (textarea) */}
            {/* Botón submit con estado de loading */}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-white text-[var(--void)] py-4 font-semibold uppercase tracking-wider hover:bg-[var(--warm-white)] transition-colors disabled:opacity-50 rounded-md"
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar cotización →'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
```

NOTA PARA CLAUDE CODE: Implementar todos los campos del formulario con inputs estilizados. El `industry` debe ser un `<select>` con opciones: Legal, Construcción, Inmobiliaria, Otra. Todos los inputs deben tener estilo oscuro consistente con el diseño.

### Step 3.2 — Quote API Route (proxy a backend)

```typescript
// src/app/api/quote/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validar campos requeridos
    if (!body.name || !body.email || !body.industry || !body.problem) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    // Enviar al backend FastAPI
    const backendUrl = process.env.BACKEND_URL;
    const response = await fetch(`${backendUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Backend error');
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Quote API error:', error);
    return NextResponse.json({ error: 'Error procesando cotización' }, { status: 500 });
  }
}
```

---

## FASE 4: SEO Y GEO

### Step 4.1 — Sitemap dinámico

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adaptateia.cl';

  // Páginas estáticas
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/industrias/legal`, lastModified: new Date(), priority: 0.9 },
    // Agregar más industrias cuando se creen
  ];

  // TODO: Cuando exista el blog, agregar posts dinámicamente
  // const posts = await getBlogPosts();
  // const blogPages = posts.map(p => ({ url: `${baseUrl}/blog/${p.slug}`, lastModified: p.date }));

  return [...staticPages];
}
```

### Step 4.2 — robots.ts (permitir AI search bots, bloquear training bots)

```typescript
// src/app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Buscadores clásicos — PERMITIR
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },

      // AI SEARCH bots — PERMITIR (crítico para GEO)
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },

      // AI TRAINING bots — BLOQUEAR (no queremos que entrenen con nuestro contenido gratis)
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },

      // Default
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://adaptateia.cl/sitemap.xml',
  };
}
```

### Step 4.3 — llms.txt

```markdown
// public/llms.txt

# Adaptate IA

> Empresa chilena especializada en implementación de equipos de agentes de inteligencia artificial multiagente para negocios. Operamos desde Santiago de Chile atendiendo toda Latinoamérica.

Adaptate IA diseña e implementa sistemas donde múltiples agentes de IA especializados trabajan coordinados por un orquestador central para automatizar procesos completos de negocios. La filosofía de la empresa se basa en la adaptación al cambio: "No sobrevive el más fuerte ni el más inteligente, sino el que mejor se adapta al cambio."

## Servicios por Industria

- [Agentes de IA para Estudios Jurídicos](/industrias/legal): Investigación jurídica automatizada, redacción de contratos, compliance regulatorio y gestión de causas con IA para estudios de abogados en Chile.
- [Agentes de IA para Construcción](/industrias/construccion): Presupuestos inteligentes, seguimiento de obra, gestión de subcontratistas y compliance de seguridad para constructoras.
- [Agentes de IA para Inmobiliarias](/industrias/inmobiliaria): Calificación de leads, matching propiedades-clientes, seguimiento automatizado y valorización con IA para corredoras.

## Empresa

- [Inicio](https://adaptateia.cl): Página principal con información de servicios, casos de uso y formulario de cotización.
- [Blog](/blog): Artículos sobre IA aplicada a industrias en Chile y Latinoamérica.

## Contacto

- Cotización gratuita en < 2 minutos: https://adaptateia.cl/#quote-form
- Email: hola@adaptateia.cl
- LinkedIn: https://linkedin.com/company/adaptate-ia
- Instagram: https://instagram.com/adaptate.ia
```

### Step 4.4 — Página de vertical: Legal

```tsx
// src/app/industrias/legal/page.tsx
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Agentes de IA para Estudios Jurídicos en Chile',
  description: 'Implementamos sistemas multiagente de inteligencia artificial para estudios de abogados. Investigación jurídica automatizada, redacción de contratos, compliance y gestión de causas. Santiago, Chile.',
  alternates: { canonical: '/industrias/legal' },
  openGraph: {
    title: 'Agentes de IA para Estudios Jurídicos | Adaptate IA',
    description: 'Automatiza la investigación jurídica, redacción de contratos y gestión de causas con agentes de IA especializados en derecho chileno.',
  },
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Agentes de IA para Estudios Jurídicos',
  description: 'Sistema multiagente de inteligencia artificial especializado en derecho chileno. Incluye agentes de investigación jurídica, redacción de contratos, compliance regulatorio y gestión de causas.',
  provider: {
    '@type': 'Organization',
    name: 'Adaptate IA',
    url: 'https://adaptateia.cl',
  },
  areaServed: 'Chile',
  serviceType: 'Implementación de IA',
};

export default function LegalPage() {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      {/* CONTENIDO DE LA PÁGINA LEGAL */}
      {/* Secciones: Hero específico legal, Problema del sector, Agentes incluidos, FAQ legal, CTA */}
      {/* TODO: Claude Code debe implementar el contenido completo */}
      {/* El contenido debe responder preguntas como: */}
      {/* - ¿Qué es un agente de IA para abogados? */}
      {/* - ¿Cómo funciona la investigación jurídica con IA? */}
      {/* - ¿Cuánto cuesta implementar IA en un estudio jurídico en Chile? */}
      {/* - ¿Qué tareas puede automatizar un sistema multiagente en un estudio de abogados? */}
      {/* Cada pregunta respondida = una oportunidad GEO */}
    </>
  );
}
```

### Step 4.5 — Reglas de contenido GEO para todas las páginas

Seguir estas reglas en TODAS las páginas y secciones:

1. Cada `<section>` debe tener un `id` descriptivo (usado por el agente para navegar)
2. Cada `<h2>` debe ser una pregunta implícita o explícita que un usuario le haría a un LLM
3. El primer párrafo después de cada `<h2>` debe ser una respuesta autocontenida de 2-3 oraciones (los LLMs extraen estos fragmentos)
4. Incluir keywords naturales: "agentes de IA", "Chile", "multiagente", "automatización", nombre de la industria
5. Usar JSON-LD en cada página con el schema apropiado
6. No usar contenido genérico — cada dato debe ser específico a Chile/LATAM y al sector

---

## FASE 5: BACKEND FASTAPI

### Step 5.1 — Estructura del backend

```
backend/
├── app/
│   ├── main.py                    # FastAPI app + endpoints
│   ├── agents/
│   │   └── quote_agent.py         # Agente LangGraph de cotizaciones
│   ├── services/
│   │   ├── email_service.py       # Resend integration
│   │   ├── pdf_service.py         # Generación de PDFs
│   │   └── telegram_service.py    # Notificación al fundador
│   ├── templates/
│   │   ├── quote_email.html       # Template del email
│   │   └── quote_pdf.html         # Template del PDF
│   └── config.py                  # Settings con pydantic-settings
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── .env
```

### Step 5.2 — FastAPI main.py

```python
# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

# CopilotKit SDK (para cuando conectes el agente)
# from copilotkit.integrations.fastapi import add_fastapi_endpoint
# from copilotkit import CopilotKitSDK, LangGraphAgent

from app.services.email_service import send_quote_email
from app.services.pdf_service import generate_quote_pdf
from app.services.telegram_service import notify_telegram

app = FastAPI(title="Adaptate IA Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://adaptateia.cl", "http://localhost:3000"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

class QuoteRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str = ""
    company: str = ""
    industry: str
    problem: str

@app.post("/quote")
async def create_quote(data: QuoteRequest):
    # 1. Generar cotización con Claude
    # TODO: Implementar agente LangGraph que analice el request y genere propuesta
    # Por ahora, usar lógica simple + Claude API directa
    
    quote_content = await generate_quote_with_ai(data)
    
    # 2. Generar PDF
    pdf_bytes = generate_quote_pdf(quote_content, data)
    
    # 3. Enviar email con PDF adjunto
    await send_quote_email(
        to=data.email,
        name=data.name,
        pdf_bytes=pdf_bytes,
    )
    
    # 4. Notificar al fundador por Telegram
    await notify_telegram(
        f"Nueva cotización: {data.name} ({data.email}) - {data.industry}\n{data.problem[:200]}"
    )
    
    return {"status": "ok", "message": "Cotización enviada"}


async def generate_quote_with_ai(data: QuoteRequest) -> dict:
    """Genera el contenido de la cotización usando Claude."""
    import anthropic
    import os
    
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
    
    message = client.messages.create(
        model="claude-sonnet-4-5-20250929",
        max_tokens=2000,
        system="""Eres el generador de cotizaciones de Adaptate IA, empresa chilena de agentes de IA.
        
Genera una cotización profesional basada en la información del cliente. Incluye:
- Resumen del problema del cliente
- Solución propuesta (qué agentes implementar)
- Alcance del proyecto
- Timeline estimado (5-7 días para MVP)
- Precio estimado (rango en USD basado en complejidad)
- Próximos pasos

Precios de referencia:
- Implementación básica (1-2 agentes): $500-1,500 USD
- Implementación media (3-4 agentes): $1,500-3,000 USD
- Implementación completa (5+ agentes): $3,000-8,000 USD
- Mantenimiento mensual: $300-800 USD/mes

Responde en español. Sé profesional pero accesible. Formato en JSON con campos:
{
  "summary": "...",
  "solution": "...",
  "scope": ["item1", "item2"],
  "timeline": "...",
  "price_range": "...",
  "next_steps": ["paso1", "paso2"]
}""",
        messages=[{
            "role": "user",
            "content": f"""Cliente: {data.name}
Empresa: {data.company or 'No especificada'}
Industria: {data.industry}
Problema: {data.problem}
Email: {data.email}
Teléfono: {data.phone or 'No proporcionado'}"""
        }],
    )
    
    import json
    # Parsear JSON de la respuesta
    response_text = message.content[0].text
    # Limpiar posibles backticks de markdown
    response_text = response_text.strip('`').strip()
    if response_text.startswith('json'):
        response_text = response_text[4:].strip()
    
    return json.loads(response_text)
```

### Step 5.3 — Servicio de email con Resend

```python
# backend/app/services/email_service.py
import resend
import base64
import os

resend.api_key = os.environ["RESEND_API_KEY"]

async def send_quote_email(to: str, name: str, pdf_bytes: bytes):
    pdf_b64 = base64.b64encode(pdf_bytes).decode("utf-8")
    
    resend.Emails.send({
        "from": "Adaptate IA <cotizaciones@adaptateia.cl>",
        "to": [to],
        "subject": f"{name}, tu cotización de Adaptate IA está lista",
        "html": f"""
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0a0a0a;">¡Hola {name}!</h1>
            <p>Gracias por tu interés en Adaptate IA. Adjunto encontrarás tu cotización personalizada.</p>
            <p>Si tienes preguntas, responde directamente a este email o agenda una llamada.</p>
            <br>
            <p>— Equipo Adaptate IA</p>
            <p style="color: #888; font-size: 12px;">
                <em>"No sobrevive el más fuerte, sino el que mejor se adapta al cambio."</em>
            </p>
        </div>
        """,
        "attachments": [
            {"content": pdf_b64, "filename": "cotizacion-adaptate-ia.pdf"}
        ],
    })
```

### Step 5.4 — Docker setup

```dockerfile
# backend/Dockerfile
FROM python:3.12-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpango-1.0-0 libpangoft2-1.0-0 libharfbuzz0b libffi-dev \
    && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# backend/docker-compose.yml
version: "3.8"
services:
  backend:
    build: .
    ports:
      - "8000:8000"
    env_file:
      - .env
    restart: unless-stopped
```

---

## FASE 6: DEPLOY

### Step 6.1 — Frontend en Vercel

1. Push el repo a GitHub
2. Conectar repo en vercel.com
3. Configurar variables de entorno en Vercel dashboard:
   - `ANTHROPIC_API_KEY`
   - `BACKEND_URL` (URL pública de tu servidor FastAPI)
   - `RESEND_API_KEY`
4. Configurar custom domain: `adaptateia.cl`
5. Activar Vercel Analytics (gratuito)

### Step 6.2 — Backend en servidor propio

1. Instalar Docker en tu servidor Ubuntu
2. Clonar repo del backend
3. Configurar `.env` con API keys
4. `docker-compose up -d`
5. Configurar reverse proxy (Nginx/Caddy) con SSL para exponer el backend en un subdominio como `api.adaptateia.cl`

### Step 6.3 — Dominio

1. Registrar `adaptateia.cl` en nic.cl (~$12.000 CLP/año)
2. Configurar DNS: apuntar a Vercel (frontend) y a tu servidor (backend)
3. Configurar dominio en Resend (registros SPF, DKIM, DMARC para que los emails no caigan en spam)

### Step 6.4 — Post-deploy

1. Verificar sitio en Google Search Console
2. Enviar sitemap manualmente
3. Verificar que robots.txt permite AI search bots
4. Probar el flujo completo: usuario llena form → backend genera cotización → email con PDF llega
5. Probar el agente CopilotKit: pedir "llena el formulario" y verificar que funciona

---

## PRIORIDADES DE IMPLEMENTACIÓN

Claude Code debe seguir este orden estricto:

1. **Setup proyecto Next.js** (Steps 1.1-1.5) — 15 min
2. **Estilo base y layout** (Steps 2.1-2.3) — 30 min
3. **Landing page con todas las secciones** (Steps 2.6-2.7) — 2-3 horas
4. **CopilotKit runtime** (Steps 2.4) — 15 min
5. **Formulario con CopilotKit** (Steps 3.1-3.2) — 1 hora
6. **SEO/GEO completo** (Steps 4.1-4.5) — 1 hora
7. **Página vertical Legal** (Step 4.4) — 1 hora
8. **Backend FastAPI** (Steps 5.1-5.4) — 2 horas

El sitio debe funcionar sin el backend en Fase 1 — el formulario puede mostrar un mensaje de confirmación temporal hasta que el backend esté conectado.

---

## NOTAS CRÍTICAS PARA CLAUDE CODE

1. **NO usar Vercel AI SDK.** Solo CopilotKit. Son redundantes para este caso.
2. **NO poner `'use client'` en componentes que no lo necesitan.** Solo los que usan hooks de CopilotKit, useState, useEffect, onClick, etc. Las secciones de contenido estático DEBEN ser Server Components.
3. **Mobile-first.** El dueño de pyme chileno visita desde el celular. Todo debe verse perfecto en 375px+.
4. **Estética grayscale consistente.** Negro (#0a0a0a) de fondo, blanco puro (#ffffff) como accent, blanco cálido (#f0efe9) para texto body. Sin ningún color — todo grayscale. Border-radius 6px en todo. Space Mono para tags/labels/monospace. Outfit para cuerpo. Lee DESIGN.md para referencia completa.
5. **Contenido en español.** Todo el sitio, metadata, JSON-LD, llms.txt — todo en español excepto los atributos técnicos de schema.org.
6. **Cada sección necesita un `id`** para que el agente CopilotKit pueda navegar con `scrollIntoView`.
7. **El formulario es el componente más importante.** Debe verse profesional, funcionar en mobile, y la integración con CopilotKit debe ser seamless.
8. **`await params`** — Next.js 15 cambió params a Promise. No olvidar en páginas dinámicas como `[slug]`.
9. **Resend requiere dominio verificado.** Hasta que se configure, usar el dominio de prueba de Resend (`onboarding@resend.dev`) para testing.
10. **El backend es independiente.** El frontend debe funcionar sin backend (mostrando un mensaje de "procesando" temporal). Conectar cuando el backend esté listo.


claude --resume 027f231a-9fc1-4f39-aee4-5d37262f547a