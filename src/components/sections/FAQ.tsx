'use client';

import { useState } from 'react';

const faqs = [
  {
    q: '¿Cuánto tiempo tarda la implementación?',
    a: 'Un agente típico se implementa en 5 a 10 días. El proceso incluye diagnóstico, diseño, desarrollo, pruebas y puesta en marcha. Proyectos más complejos con múltiples integraciones pueden tomar 2 a 4 semanas.',
  },
  {
    q: '¿Necesito conocimientos técnicos?',
    a: 'No. Nuestros agentes se diseñan para que interactúes con ellos en lenguaje natural — por WhatsApp, Telegram, email o un chat en tu sitio. Tú describes lo que necesitas como si hablaras con un colega, y el agente ejecuta.',
  },
  {
    q: '¿Cuánto cuesta desarrollar un agente?',
    a: 'El costo depende del alcance del agente: la cantidad de integraciones, la complejidad del flujo y el nivel de automatización requerido. Cada proyecto es distinto, por eso incluimos una cotización personalizada gratuita — cuéntanos qué quieres automatizar y te enviamos una propuesta concreta en menos de 24 horas.',
  },
  {
    q: '¿A qué sistemas se puede conectar un agente?',
    a: 'Prácticamente cualquiera: WhatsApp, email, Google Workspace, Slack, CRMs, ERPs, bases de datos, APIs propias, plataformas de ads, redes sociales. Si tiene una API o acepta webhooks, lo podemos conectar.',
  },
  {
    q: '¿Qué es un agente de IA?',
    a: 'Un agente de IA es un sistema que puede ejecutar tareas de forma autónoma: responder clientes, procesar documentos, analizar datos, gestionar campañas. A diferencia de un chatbot, un agente toma decisiones, se conecta a tus sistemas y actúa sin intervención humana. Funciona 24/7 sin descanso, sin errores operativos y sin rotación de personal.',
  },
  {
    q: '¿Trabajan con empresas fuera de Chile?',
    a: 'Sí. Operamos desde Santiago de Chile pero atendemos toda Latinoamérica de forma remota. Los agentes funcionan en español y se adaptan a las regulaciones y herramientas de cada país.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="px-6 py-24"
      style={{ background: '#0a0a0a', borderTop: '1px solid #1e1e1e' }}
    >
      <div className="max-w-2xl mx-auto">
        <p
          className="font-mono mb-6"
          style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#767676' }}
        >
          // PREGUNTAS FRECUENTES
        </p>
        <h2
          className="font-bold mb-12"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: '#f0efe9',
            lineHeight: '1.2',
          }}
        >
          Lo que necesitas saber.
        </h2>

        <div>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const triggerId = `faq-trigger-${i}`;
            return (
              <div key={i} style={{ borderTop: '1px solid #2a2a2a' }}>
                <button
                  id={triggerId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full flex items-start justify-between gap-6 py-5 text-left rounded-sm"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span
                    className="font-medium"
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '1rem',
                      color: '#f0efe9',
                      fontWeight: 500,
                      lineHeight: '1.5',
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0"
                    style={{
                      color: '#ffffff',
                      fontSize: '1.25rem',
                      lineHeight: 1,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      marginTop: '2px',
                    }}
                  >
                    +
                  </span>
                </button>

                {/* CSS grid trick: animates row height without triggering layout reflow */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                    transition: 'grid-template-rows 0.35s ease, opacity 0.25s ease',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <p
                      className="pb-5"
                      style={{
                        fontSize: '0.9rem',
                        color: '#888888',
                        lineHeight: '1.7',
                      }}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: '1px solid #2a2a2a' }} />
        </div>

        <div className="mt-12 text-center">
          <p className="mb-5" style={{ color: '#767676', fontSize: '0.9rem' }}>
            ¿Todo claro? Solicita tu cotización en 2 minutos.
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center justify-center font-mono text-sm font-bold tracking-widest uppercase px-8 py-4 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{
              background: '#ffffff',
              color: '#0a0a0a',
              borderRadius: '6px',
              transition: 'transform 0.2s',
            }}
          >
            Solicitar cotización gratis →
          </a>
        </div>
      </div>
    </section>
  );
}
