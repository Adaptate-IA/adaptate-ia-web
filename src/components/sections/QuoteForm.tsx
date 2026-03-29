'use client';

import { useState, useEffect } from 'react';

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

const inputErrorStyle = {
  ...inputStyle,
  border: '1px solid rgba(239,68,68,0.6)',
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

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = { name: '', email: '', company: '', problem: '' };

function validateField(name: keyof FormData, value: string): string | undefined {
  if (name === 'name' && !value.trim()) return 'El nombre es requerido';
  if (name === 'email') {
    if (!value.trim()) return 'El email es requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
  }
  if (name === 'problem' && !value.trim()) return 'Cuéntanos qué quieres automatizar';
  return undefined;
}

export function QuoteForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    const handler = (e: Event) => setFormData((e as CustomEvent).detail);
    window.addEventListener('fill-quote-form', handler);
    return () => window.removeEventListener('fill-quote-form', handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error as user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name as keyof FormData, value);
    if (error) setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all required fields before submit
    const newErrors: FormErrors = {};
    (['name', 'email', 'problem'] as (keyof FormData)[]).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus first invalid field
      const firstErrorField = Object.keys(newErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setStatus('sending');
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus('sent');
    setFormData(initialFormData);
    setErrors({});
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
          style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#767676' }}
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
        <p className="mb-2" style={{ color: '#767676', lineHeight: '1.7' }}>
          Cuéntanos el problema. Te respondemos con una propuesta concreta en menos de 24 horas.
        </p>
        <p className="font-mono mb-10" style={{ fontSize: '0.75rem', color: '#767676', letterSpacing: '0.05em' }}>
          Cotización gratuita · Sin compromiso
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
            <p className="font-mono text-xs tracking-widest mb-4" style={{ color: '#767676' }}>
              // RECIBIDO
            </p>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#f0efe9' }}>
              Revisamos tu caso y te respondemos en menos de 24 horas.
            </h3>
            <p className="mb-6" style={{ color: '#888888', lineHeight: '1.7' }}>
              Recibirás una propuesta concreta — no un formulario genérico.
              Si tienes dudas mientras tanto, el chat está disponible ahora mismo.
            </p>
            <p className="font-mono text-xs" style={{ color: '#767676', letterSpacing: '0.1em' }}>
              contacto@adaptateia.com · Santiago de Chile
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                  onBlur={handleBlur}
                  placeholder="Juan Pérez"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  style={errors.name ? inputErrorStyle : inputStyle}
                />
                {errors.name && (
                  <p id="name-error" role="alert" style={{ color: 'rgb(239,68,68)', fontSize: '0.75rem', marginTop: '0.375rem' }}>
                    {errors.name}
                  </p>
                )}
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
                  onBlur={handleBlur}
                  placeholder="juan@empresa.cl"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  style={errors.email ? inputErrorStyle : inputStyle}
                />
                {errors.email && (
                  <p id="email-error" role="alert" style={{ color: 'rgb(239,68,68)', fontSize: '0.75rem', marginTop: '0.375rem' }}>
                    {errors.email}
                  </p>
                )}
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
                onBlur={handleBlur}
                placeholder="Ej: Respondemos manualmente +50 emails al día con las mismas preguntas. Queremos que un agente lo haga solo..."
                aria-invalid={!!errors.problem}
                aria-describedby={errors.problem ? 'problem-error' : undefined}
                style={errors.problem ? { ...inputStyle, resize: 'vertical', border: '1px solid rgba(239,68,68,0.6)' } : { ...inputStyle, resize: 'vertical' }}
              />
              {errors.problem && (
                <p id="problem-error" role="alert" style={{ color: 'rgb(239,68,68)', fontSize: '0.75rem', marginTop: '0.375rem' }}>
                  {errors.problem}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                width: '100%',
                background: status === 'sending' ? '#767676' : '#ffffff',
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              {status === 'sending' && (
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ animation: 'spin 0.8s linear infinite' }}
                >
                  <circle cx="8" cy="8" r="6" stroke="#0a0a0a" strokeOpacity="0.3" strokeWidth="2" />
                  <path d="M14 8a6 6 0 0 0-6-6" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
              {status === 'sending' ? 'Enviando…' : 'Quiero mi cotización gratis →'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
