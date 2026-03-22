'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from 'ai';
import { Fragment, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
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
      const toolCall = rawToolCall as unknown as {
        toolName: string;
        toolCallId: string;
        args: Record<string, string>;
      };

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
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap: keep focus inside the panel while it's open
  useEffect(() => {
    if (!isOpen) return;

    const panel = panelRef.current;
    if (!panel) return;

    // Move focus into the panel when it opens
    const firstFocusable = panel.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.closest('[aria-hidden="true"]'));

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text?.trim() || isLoading) return;
    sendMessage({ text: message.text });
  };

  const handleSuggestion = (suggestion: string) => {
    sendMessage({ text: suggestion });
  };

  return (
    <div
      ref={panelRef}
      className={cn(
        'fixed right-0 top-[4.375rem] h-[calc(100dvh-4.375rem)] w-[min(400px,100vw)]',
        'bg-[#0a0a0a] border-l border-[#2a2a2a] z-50',
        'flex flex-col transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : 'translate-x-full',
      )}
      aria-hidden={!isOpen}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-white text-[0.9rem]" aria-hidden="true">✦</span>
          <span className="text-[0.7rem] text-white/40 font-mono tracking-[0.2em] uppercase">
            Adaptate IA
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar asistente"
          className="bg-transparent border border-white/10 text-white/40 cursor-pointer text-xs leading-none px-2 py-1.5 rounded flex items-center justify-center transition-[border-color,color] duration-200 hover:border-white/30 hover:text-white/80"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>

      {/* Messages */}
        <Conversation className="chat-scroll">
          <ConversationContent className="px-2 py-5 gap-4">
            {messages.length === 0 && (
              <div className="flex flex-col gap-4">
                <p className="text-white/70 text-[0.9rem] leading-[1.6]">
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
      <div className="px-4 py-3 border-t border-white/[0.06] shrink-0">
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
