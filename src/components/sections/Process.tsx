const steps = [
  {
    number: '01',
    title: 'Nos cuentas el problema',
    description:
      'Qué proceso consume más tiempo, genera más errores o frena el crecimiento de tu equipo. No necesitas saber de IA.',
  },
  {
    number: '02',
    title: 'Diseñamos el agente',
    description:
      'Definimos el alcance, las integraciones y el flujo de trabajo en una sesión. Tú apruebas antes de que escribamos una línea de código.',
  },
  {
    number: '03',
    title: 'Lo entregamos funcionando',
    description:
      'El agente queda operando en tus sistemas. Te capacitamos, te damos soporte y lo ajustamos hasta que funcione exactamente como necesitas.',
  },
];

export function Process() {
  return (
    <section
      id="process"
      style={{ background: '#0a0a0a', borderTop: '1px solid #1e1e1e' }}
      className="px-6 py-32"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left — heading */}
          <div>
            <p
              className="font-mono mb-6"
              style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#555555' }}
            >
              // CÓMO FUNCIONA
            </p>
            <h2
              className="font-bold"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                color: '#f0efe9',
                lineHeight: '1.15',
              }}
            >
              Simple para ti.<br />
              <span style={{ color: '#555555' }}>Complejo por dentro.</span>
            </h2>
          </div>

          {/* Right — steps */}
          <div style={{ borderTop: '1px solid #1e1e1e' }}>
            {steps.map((step) => (
              <div
                key={step.number}
                className="py-8"
                style={{ borderBottom: '1px solid #1e1e1e' }}
              >
                <div className="flex items-start gap-8">
                  <span
                    className="font-mono flex-shrink-0"
                    style={{ fontSize: '0.7rem', color: '#555555', letterSpacing: '0.1em', paddingTop: '2px' }}
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3
                      className="font-semibold mb-2"
                      style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', color: '#f0efe9' }}
                    >
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#666666', lineHeight: '1.65' }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
