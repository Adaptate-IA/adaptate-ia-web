import { Hero } from '@/components/sections/Hero';
import { Process } from '@/components/sections/Process';
import { QuoteForm } from '@/components/sections/QuoteForm';
import { FAQ } from '@/components/sections/FAQ';
import { CTA } from '@/components/sections/CTA';
import { JsonLd } from '@/components/seo/JsonLd';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
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
      name: '¿Cuánto cuesta desarrollar un agente?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depende de la complejidad del proceso a automatizar. Un agente básico (una tarea específica) parte desde $500 USD. Sistemas más complejos con múltiples agentes coordinados van de $1,500 a $8,000 USD. Incluimos una cotización personalizada gratuita — solo cuéntanos qué necesitas.',
      },
    },
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
      name: '¿A qué sistemas se puede conectar un agente?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prácticamente cualquiera: WhatsApp, email, Google Workspace, Slack, CRMs, ERPs, bases de datos, APIs propias, plataformas de ads, redes sociales. Si tiene una API o acepta webhooks, lo podemos conectar.',
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
      <JsonLd data={faqJsonLd} />
      <Hero />
      <Process />
      <QuoteForm />
      <FAQ />
      <CTA />
    </>
  );
}
