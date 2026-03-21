'use client';

export function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: '-100%',
        left: '1rem',
        background: '#ffffff',
        color: '#0a0a0a',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.75rem',
        fontWeight: 700,
        zIndex: 9999,
        transition: 'top 0.2s',
      }}
      onFocus={(e) => { e.currentTarget.style.top = '1rem'; }}
      onBlur={(e) => { e.currentTarget.style.top = '-100%'; }}
    >
      Saltar al contenido
    </a>
  );
}
