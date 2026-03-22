export function CTA() {
  return (
    <section
      id="cta"
      className="relative py-32 px-6 overflow-hidden"
      style={{ borderTop: '1px solid #2a2a2a' }}
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/dot-hands.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark radial overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.95) 100%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <p
          className="font-mono mb-6"
          style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#767676' }}
        >
          // EL MEJOR MOMENTO FUE AYER
        </p>
        <h2
          className="font-bold mb-8"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2.4rem, 6vw, 5rem)',
            color: '#f0efe9',
            lineHeight: '1.1',
          }}
        >
          Adaptarse no es{' '}
          <em style={{ fontStyle: 'italic', color: '#ffffff' }}>opcional.</em>
        </h2>
        <p
          className="text-lg mb-10 mx-auto"
          style={{ color: '#888888', maxWidth: '480px', lineHeight: '1.7' }}
        >
          Las empresas que automatizan hoy compiten diferente mañana.
          ¿En qué lado de ese cambio quieres estar?
        </p>
        <a
          href="#contact-form"
          className="inline-flex items-center justify-center font-mono text-sm font-bold tracking-widest uppercase px-10 py-5 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{
            background: '#ffffff',
            color: '#0a0a0a',
            borderRadius: '6px',
            transition: 'transform 0.2s',
          }}
        >
          QUIERO MI COTIZACIÓN GRATIS →
        </a>
      </div>
    </section>
  );
}
