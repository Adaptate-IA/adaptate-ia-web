export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center px-6 pt-20"
      style={{ background: '#0a0a0a' }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      <div className="max-w-6xl mx-auto w-full py-24 relative">
        <p
          className="font-mono mb-8"
          style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#767676' }}
        >
          // DESARROLLO DE AGENTES DE IA
        </p>

        <h1
          className="font-bold leading-none tracking-tight mb-8"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            color: '#f0efe9',
            maxWidth: '860px',
          }}
        >
          Adáptate antes<br />
          que tu competencia.
        </h1>

        <p
          className="text-lg leading-relaxed mb-10"
          style={{
            color: '#888888',
            maxWidth: '520px',
            lineHeight: '1.7',
          }}
        >
          Diseñamos y desarrollamos agentes de IA a medida para tu empresa.
          Conectados a tus sistemas, trabajando solos, disponibles 24/7.
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
          Cuéntanos qué quieres automatizar →
        </a>

        {/* Darwin quote — desktop only */}
        <div className="hidden md:block absolute bottom-12 right-0 max-w-xs text-right">
          <p className="text-xs italic leading-relaxed" style={{ color: '#767676' }}>
            &ldquo;No sobrevive el más fuerte ni el más inteligente, sino el que
            mejor se adapta al cambio.&rdquo;
          </p>
          <p className="font-mono text-xs mt-2 tracking-widest" style={{ color: '#444444' }}>
            — CHARLES DARWIN
          </p>
        </div>
      </div>
    </section>
  );
}
