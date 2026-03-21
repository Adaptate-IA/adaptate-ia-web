'use client';

import { useState } from 'react';

const inputStyle = {
  background: '#1a1a1a',
  border: '1px solid #2a2a2a',
  color: '#f0efe9',
  borderRadius: '6px',
  padding: '0.875rem 1rem',
  width: '100%',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '1rem',
  transition: 'border-color 0.3s',
  outline: 'none',
};

const labelStyle = {
  display: 'block',
  fontFamily: "'Space Mono', monospace",
  fontSize: '0.7rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  color: '#888888',
  marginBottom: '0.5rem',
};

interface FormData {
  name: string;
  email: string;
  company: string;
  problem: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  company: '',
  problem: '',
};

export function QuoteForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus('sent');
    setFormData(initialFormData);
  };


  return (
    <section
      id="contact-form"
      className="py-24 px-6"
      style={{ background: '#0a0a0a', borderTop: '1px solid #1e1e1e' }}
    >
      <div className="max-w-2xl mx-auto">
        <p
          className="font-mono mb-6"
          style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#555555' }}
        >
          // EMPIEZA AQUÍ
        </p>
        <h2
          className="font-bold mb-4"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: '#f0efe9',
            lineHeight: '1.2',
          }}
        >
          ¿Qué quieres automatizar?
        </h2>
        <p className="mb-10" style={{ color: '#555555', lineHeight: '1.7' }}>
          Cuéntanos el problema. Te respondemos con una propuesta concreta en menos de 24 horas.
        </p>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {status === 'sent' && 'Mensaje enviado. Te contactamos pronto.'}
          {status === 'error' && 'Error al enviar. Intenta nuevamente.'}
        </div>

        {status === 'sent' ? (
          <div
            className="p-10 text-center"
            style={{ background: '#1a1a1a', border: '1px solid #ffffff', borderRadius: '6px' }}
          >
            <p className="font-mono text-xs tracking-widest mb-4" style={{ color: '#888888' }}>
              // RECIBIDO
            </p>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#f0efe9' }}>
              Nos ponemos en contacto pronto.
            </h3>
            <p style={{ color: '#888888' }}>
              Revisa tu email. Si no lo ves en 24 horas, escríbenos a hola@adaptateia.cl
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" style={labelStyle}>Nombre *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Juan Pérez"
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="email" style={labelStyle}>Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="juan@empresa.cl"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" style={labelStyle}>Empresa</label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                value={formData.company}
                onChange={handleChange}
                placeholder="Mi Empresa Ltda."
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="problem" style={labelStyle}>
                ¿Qué proceso quieres automatizar? *
              </label>
              <textarea
                id="problem"
                name="problem"
                required
                rows={4}
                value={formData.problem}
                onChange={handleChange}
                placeholder="Ej: Respondemos manualmente +50 emails al día con las mismas preguntas. Queremos que un agente lo haga solo..."
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                width: '100%',
                background: status === 'sending' ? '#555555' : '#ffffff',
                color: '#0a0a0a',
                padding: '1rem',
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                borderRadius: '6px',
                border: 'none',
                cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                transition: 'transform 0.3s, background 0.3s',
              }}
            >
              {status === 'sending' ? 'Enviando…' : 'Quiero mi agente →'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
