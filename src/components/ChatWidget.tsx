'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Flex, Text, Input } from '@once-ui-system/core';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Joey's AI assistant. I can help you learn about his background, skills, and projects. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) throw new Error('Failed to send message');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      let assistantMessage = '';
      const assistantId = (Date.now() + 1).toString();

      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);
              
              if (parsed.type === 'text-delta' && parsed.delta) {
                assistantMessage += parsed.delta;
                setMessages(prev => prev.map(m => 
                  m.id === assistantId ? { ...m, content: assistantMessage } : m
                ));
              }
            } catch (e) {
              // Ignore parsing errors for non-JSON lines
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 50 }}>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          variant="primary"
          style={{
            borderRadius: '50%',
            width: '3.5rem',
            height: '3.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          }}
        >
          💬
        </Button>
      )}

      {isOpen && (
        <Flex
          direction="column"
          background="surface"
          border="neutral-medium"
          borderStyle="solid"
          radius="l"
          style={{
            width: '20rem',
            height: '24rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          }}
        >
          <Flex
            padding="m"
            background="brand-medium"
            radius="l"
            style={{ 
              borderBottomLeftRadius: 0, 
              borderBottomRightRadius: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Flex gap="8" style={{ display: 'flex', alignItems: 'center' }}>
              <Text variant="body-default-s" onBackground="brand-medium">🤖 Joey's AI Assistant</Text>
            </Flex>
            <Button
              onClick={() => setIsOpen(false)}
              variant="tertiary"
              size="s"
              style={{ color: 'inherit' }}
            >
              ✕
            </Button>
          </Flex>

          <Flex direction="column" flex={1} padding="m" style={{ overflow: 'hidden' }}>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }}>
              <Flex direction="column" gap="m">
                {messages.map((message) => (
                  <Flex
                    key={message.id}
                    style={{ 
                      display: 'flex',
                      justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <Flex
                      direction="column"
                      padding="s"
                      radius="m"
                      background={message.role === 'user' ? 'brand-medium' : 'neutral-weak'}
                      style={{ maxWidth: '70%' }}
                    >
                      <Text
                        variant="body-default-xs"
                        onBackground={message.role === 'user' ? 'brand-medium' : 'neutral-weak'}
                      >
                        {message.content}
                      </Text>
                    </Flex>
                  </Flex>
                ))}
                
                {isLoading && (
                  <Flex style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Flex
                      padding="s"
                      radius="m"
                      background="neutral-weak"
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        Thinking...
                      </Text>
                    </Flex>
                  </Flex>
                )}
                <div ref={messagesEndRef} />
              </Flex>
            </div>

            <form onSubmit={handleSubmit}>
              <Flex gap="s" style={{ display: 'flex', alignItems: 'center' }}>
                <Input
                  id="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Joey's work..."
                  disabled={isLoading}
                  style={{ flex: 1 }}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  variant="primary"
                  size="s"
                >
                  ➤
                </Button>
              </Flex>
            </form>
          </Flex>
        </Flex>
      )}
    </div>
  );
}
