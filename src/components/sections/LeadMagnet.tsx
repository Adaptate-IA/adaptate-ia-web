'use client';

import { useState } from 'react';

export function LeadMagnet() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleBlur = () => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email inválido');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError('Ingresa tu email'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Email inválido'); return; }

    setStatus('sending');
    // TODO: connect to backend — POST /api/lead with { email }
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus('sent');
    setEmail('');
  };

  return (
    <section
      className="px-6 py-20"
      style={{ background: '#111111', borderTop: '1px solid #1e1e1e' }}
    >
      <div className="max-w-2xl mx-auto">
        <p
          className="font-mono mb-10 text-center"
          style={{ fontSize: '0.75rem', color: '#767676', letterSpacing: '0.15em' }}
        >
          No es el momento de cotizar. Sin problema — llévate esto primero.
        </p>
        {status === 'sent' ? (
          <div className="text-center">
            <p className="font-mono mb-3" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#767676' }}>
              // LISTO
            </p>
            <p style={{ color: '#f0efe9', fontSize: '1.1rem', fontFamily: "'Outfit', sans-serif" }}>
              Te lo enviamos en los próximos minutos. Revisa tu bandeja de entrada.
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <p className="font-mono mb-3" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#767676' }}>
                // GRATIS
              </p>
              <h2
                className="font-bold mb-2"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                  color: '#f0efe9',
                  lineHeight: '1.3',
                }}
              >
                Las 5 tareas que más automatizan nuestros clientes.
              </h2>
              <p style={{ color: '#888888', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Cómo identificar qué automatizar primero — desde responder consultas hasta calificar leads. Sin saber de IA.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:w-72" noValidate>
              <div>
                <label htmlFor="lead-email" className="sr-only">Email</label>
                <input
                  id="lead-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'lead-email-error' : undefined}
                  style={{
                    background: '#1a1a1a',
                    border: error ? '1px solid rgba(239,68,68,0.6)' : '1px solid #2a2a2a',
                    color: '#f0efe9',
                    borderRadius: '6px',
                    padding: '0.875rem 1rem',
                    width: '100%',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                />
                {error && (
                  <p id="lead-email-error" role="alert" style={{ color: 'rgb(239,68,68)', fontSize: '0.75rem', marginTop: '0.375rem' }}>
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  background: '#ffffff',
                  color: '#0a0a0a',
                  padding: '0.875rem 1rem',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  opacity: status === 'sending' ? 0.7 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                {status === 'sending' ? 'Enviando…' : 'Enviarme la guía →'}
              </button>
              <p style={{ color: '#767676', fontSize: '0.7rem', textAlign: 'center' }}>
                Sin spam. Solo la guía.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
