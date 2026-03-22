'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from 'ai';
import { Fragment } from 'react';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  type PromptInputMessage,
  PromptInputTextarea,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion';

interface ChatPanelProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SUGGESTIONS = [
  '¿Qué servicios ofrecen?',
  'Quiero una cotización',
  '¿Cómo funciona el proceso?',
];

export function ChatPanel({ isOpen, setIsOpen }: ChatPanelProps) {
  const { messages, sendMessage, status, addToolOutput } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    async onToolCall({ toolCall: rawToolCall }) {
      if (rawToolCall.dynamic) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const toolCall = rawToolCall as any;

      if (toolCall.toolName === 'navigateToSection') {
        document.getElementById(toolCall.args.sectionId)?.scrollIntoView({ behavior: 'smooth' });
        addToolOutput({ tool: toolCall.toolName, toolCallId: toolCall.toolCallId, output: `Navegando a ${toolCall.args.sectionId}` });
      }

      if (toolCall.toolName === 'fillQuoteForm') {
        window.dispatchEvent(new CustomEvent('fill-quote-form', { detail: toolCall.args }));
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
        addToolOutput({
          tool: toolCall.toolName,
          toolCallId: toolCall.toolCallId,
          output: 'Formulario llenado. Pide al usuario que revise y envíe.',
        });
      }
    },
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text?.trim() || isLoading) return;
    sendMessage({ text: message.text });
  };

  const handleSuggestion = (suggestion: string) => {
    sendMessage({ text: suggestion });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '4.375rem',
        right: 0,
        height: 'calc(100dvh - 4.375rem)',
        width: 'min(400px, 100vw)',
        background: '#0a0a0a',
        borderLeft: '1px solid #2a2a2a',
        zIndex: 50,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      aria-hidden={!isOpen}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.25rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#ffffff', fontSize: '0.9rem' }}>✦</span>
          <span
            style={{
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'monospace',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Adaptate IA
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar asistente"
          style={{
            background: 'none',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.4)',
            cursor: 'pointer',
            fontSize: '0.75rem',
            lineHeight: 1,
            padding: '0.3rem 0.5rem',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
          }}
        >
          ✕
        </button>
      </div>

      {/* Messages */}
        <Conversation className="chat-scroll">
          <ConversationContent className="px-2 py-5 gap-4">
            {messages.length === 0 && (
              <div className="flex flex-col gap-4">
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Hola. Soy el asistente de Adaptate IA. Puedo contarte sobre nuestros servicios,
                  ayudarte a solicitar una cotización, o navegar la página por ti. ¿En qué te puedo
                  ayudar?
                </p>
                <Suggestions>
                  {SUGGESTIONS.map((s) => (
                    <Suggestion key={s} suggestion={s} onClick={handleSuggestion} />
                  ))}
                </Suggestions>
              </div>
            )}

            {messages.map((msg, msgIndex) => (
              <Fragment key={msg.id}>
                {msg.parts.map((part, i) => {
                  if (part.type !== 'text' || !part.text) return null;
                  const isLastMsg = msgIndex === messages.length - 1;
                  return (
                    <Message key={`${msg.id}-${i}`} from={msg.role}>
                      <MessageContent className={msg.role === 'user' ? 'bg-[#1a1a1a] rounded-lg px-4 py-3 border border-[#2a2a2a]' : ''}>
                        <MessageResponse>{part.text}</MessageResponse>
                      </MessageContent>
                    </Message>
                  );
                })}
              </Fragment>
            ))}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

      {/* Input */}
      <div
        style={{
          padding: '0.75rem 1rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}
      >
        <PromptInput onSubmit={handleSubmit} className="relative">
          <PromptInputTextarea
            placeholder="Escribe aquí..."
            className="pr-12 text-sm"
          />
          <PromptInputSubmit
            status={isLoading ? 'streaming' : 'ready'}
            className="absolute bottom-2 right-2"
          />
        </PromptInput>
      </div>
    </div>
  );
}
