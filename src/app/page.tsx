import { Hero } from '@/components/sections/Hero';
import { Process } from '@/components/sections/Process';
import { LeadMagnet } from '@/components/sections/LeadMagnet';
import { QuoteForm } from '@/components/sections/QuoteForm';
import { FAQ } from '@/components/sections/FAQ';
import { CTA } from '@/components/sections/CTA';
import { JsonLd } from '@/components/seo/JsonLd';

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Cómo implementar un agente de IA en tu empresa',
  description:
    'Proceso en 3 pasos para automatizar tareas de tu negocio con un agente de inteligencia artificial a medida.',
  totalTime: 'P10D',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Cuéntanos el problema',
      text: 'Nos describes qué proceso consume más tiempo, genera más errores o frena el crecimiento de tu equipo. No necesitas saber de IA.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Diseñamos el agente',
      text: 'Definimos el alcance, las integraciones y el flujo de trabajo en una sesión. Tú apruebas antes de que escribamos una línea de código.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Lo entregamos funcionando',
      text: 'En 5 a 10 días el agente queda operando en tus sistemas. Te capacitamos, te damos soporte y lo ajustamos hasta que funcione exactamente como necesitas.',
    },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo tarda la implementación?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un agente típico se implementa en 5 a 10 días. El proceso incluye diagnóstico, diseño, desarrollo, pruebas y puesta en marcha. Proyectos más complejos con múltiples integraciones pueden tomar 2 a 4 semanas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Necesito conocimientos técnicos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Nuestros agentes se diseñan para que interactúes con ellos en lenguaje natural — por WhatsApp, Telegram, email o un chat en tu sitio. Tú describes lo que necesitas como si hablaras con un colega, y el agente ejecuta.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta desarrollar un agente?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El costo depende del alcance del agente: la cantidad de integraciones, la complejidad del flujo y el nivel de automatización requerido. Cada proyecto es distinto, por eso incluimos una cotización personalizada gratuita — cuéntanos qué quieres automatizar y te enviamos una propuesta concreta en menos de 24 horas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿A qué sistemas se puede conectar un agente?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prácticamente cualquiera: WhatsApp, email, Google Workspace, Slack, CRMs, ERPs, bases de datos, APIs propias, plataformas de ads, redes sociales. Si tiene una API o acepta webhooks, lo podemos conectar.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es un agente de IA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un agente de IA es un sistema que puede ejecutar tareas de forma autónoma: responder clientes, procesar documentos, analizar datos, gestionar campañas. A diferencia de un chatbot, un agente toma decisiones, se conecta a tus sistemas y actúa sin intervención humana. Funciona 24/7 sin descanso, sin errores operativos y sin rotación de personal.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Trabajan con empresas fuera de Chile?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Operamos desde Santiago de Chile pero atendemos toda Latinoamérica de forma remota. Los agentes funcionan en español y se adaptan a las regulaciones y herramientas de cada país.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={howToJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Hero />
      <Process />
      <FAQ />
      <QuoteForm />
      <LeadMagnet />
      <CTA />
    </>
  );
}
