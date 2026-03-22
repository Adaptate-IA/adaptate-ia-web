'use client';

import React, { useState } from 'react';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotChat } from '@copilotkit/react-ui';
import '@copilotkit/react-ui/styles.css';

const ASSISTANT_INSTRUCTIONS = `
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
- Puedes llenar el formulario de cotización por el usuario (usa fillQuoteForm)
- Puedes navegar a cualquier sección de la página (usa navigateToSection)
- Puedes hacer preguntas interactivas al usuario para entender su necesidad antes de llenar el formulario

FLUJO DE COTIZACIÓN:
Cuando alguien quiera cotizar o muestre interés:
1. Primero hazle 3-4 preguntas para entender su necesidad (una a la vez)
2. Pregunta: nombre, email, empresa (opcional), y qué proceso quiere automatizar
3. Cuando tengas los datos, usa fillQuoteForm para llenar el formulario
4. Dile que revise los datos y haga click en enviar

Si alguien dice "llena el formulario", "quiero cotizar", "me interesa", inicia el flujo de preguntas.
`;

export function CopilotProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <div style={{ display: 'flex', minHeight: '100dvh' }}>
        {/* Main content — shifts left when sidebar opens on desktop */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            transition: 'margin-right 0.3s ease',
            marginRight: isOpen ? 'min(400px, 100vw)' : '0',
          }}
        >
          {children}
        </div>

        {/* Floating open button — hidden when sidebar is open to avoid overlapping the chat input */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Abrir asistente IA"
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              right: '1.5rem',
              zIndex: 60,
              width: '3.25rem',
              height: '3.25rem',
              background: '#ffffff',
              color: '#0a0a0a',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
              fontSize: '1.25rem',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            ✦
          </button>
        )}

        {/* Sidebar panel */}
        <div
          style={{
            position: 'fixed',
            top: '4.375rem',
            right: 0,
            height: 'calc(100dvh - 4.375rem)',
            width: 'min(400px, 100vw)',
            background: '#0a0a0a',
            borderLeft: '1px solid #2a2a2a',
            zIndex: 50,
            transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
          }}
          aria-hidden={!isOpen}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1.25rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#ffffff', fontSize: '0.9rem' }}>✦</span>
              <span
                style={{
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: 'monospace',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                Adaptate IA
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar asistente"
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                lineHeight: 1,
                padding: '0.3rem 0.5rem',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
              }}
            >
              ✕
            </button>
          </div>

          {isOpen && (
            <CopilotChat
              className="copilot-chat-panel"
              instructions={ASSISTANT_INSTRUCTIONS}
              labels={{
                title: 'Asistente Adaptate IA',
                initial:
                  'Hola. Soy el asistente de Adaptate IA. Puedo contarte sobre nuestros servicios, ayudarte a solicitar una cotización, o navegar la página por ti. ¿En qué te puedo ayudar?',
                placeholder: 'Escribe aquí...',
              }}
            />
          )}
        </div>
      </div>
    </CopilotKit>
  );
}
