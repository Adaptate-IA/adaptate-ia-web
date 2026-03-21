export function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(10, 10, 10, 0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-mono text-sm font-bold tracking-widest">
          <span style={{ color: '#ffffff' }}>ADAPTATE</span>
          <span style={{ color: '#888888' }}>.IA</span>
        </a>

        <a
          href="#contact-form"
          className="font-mono text-xs font-bold tracking-widest uppercase px-5 py-2.5 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{
            background: '#ffffff',
            color: '#0a0a0a',
            borderRadius: '6px',
            transition: 'transform 0.2s',
            display: 'inline-block',
          }}
        >
          COTIZAR GRATIS
        </a>
      </div>
    </nav>
  );
}
