export function Footer() {
  return (
    <footer
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid #2a2a2a',
      }}
      className="py-12 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div>
          <div className="font-mono text-sm font-bold tracking-widest mb-2">
            <span style={{ color: '#ffffff' }}>ADAPTATE</span>
            <span style={{ color: '#888888' }}>.IA</span>
          </div>
          <p className="text-sm" style={{ color: '#767676' }}>
            Santiago, Chile — Equipos de IA para negocios reales.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="/privacy" className="text-xs font-mono tracking-wider" style={{ color: '#767676' }}>
            PRIVACIDAD
          </a>
          <a href="/terms" className="text-xs font-mono tracking-wider" style={{ color: '#767676' }}>
            TÉRMINOS
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6" style={{ borderTop: '1px solid #1a1a1a' }}>
        <p className="text-center font-mono text-xs" style={{ color: '#767676' }}>
          © {new Date().getFullYear()} Adaptate IA. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
