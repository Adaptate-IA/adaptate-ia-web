'use client';

import { useState } from 'react';
import { ChatPanel } from './ChatProvider';

export function ChatSidebar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100dvh' }}>
      {/* Main content — shifts left when sidebar opens */}
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

      {/* Floating open button */}
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
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <span aria-hidden="true">✦</span>
        </button>
      )}

      <ChatPanel isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
