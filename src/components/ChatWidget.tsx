'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Flex, Text, Input } from '@once-ui-system/core';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "That's a great question! Let me think about that for you.",
      "I understand what you're asking. Here's what I can help you with...",
      "Thanks for reaching out! I'm here to assist you with any questions.",
      "I'd be happy to help you with that. Let me provide some information.",
      "That's an interesting point. Based on what you've shared, I'd suggest...",
      "I can definitely help you with that. Here are a few options to consider.",
    ];
    
    if (userInput.toLowerCase().includes('hello') || userInput.toLowerCase().includes('hi')) {
      return "Hello there! Welcome! How can I assist you today?";
    }
    
    if (userInput.toLowerCase().includes('help')) {
      return "I'm here to help! You can ask me questions about our services, get support, or just have a conversation. What would you like to know?";
    }
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
          borderStyle="solid-1"
          radius="l"
          style={{
            width: '20rem',
            height: '24rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          }}
        >
          <Flex
            justifyContent="space-between"
            alignItems="center"
            padding="m"
            background="brand-medium"
            radius="l"
            style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
          >
            <Flex alignItems="center" gap="8">
              <Text variant="body-default-s" onBackground="brand-medium">🤖 AI Assistant</Text>
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
                    justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                  >
                    <Flex
                      direction="column"
                      padding="s"
                      radius="m"
                      background={message.sender === 'user' ? 'brand-medium' : 'neutral-weak'}
                      style={{ maxWidth: '70%' }}
                    >
                      <Text
                        variant="body-default-xs"
                        onBackground={message.sender === 'user' ? 'brand-medium' : 'neutral-weak'}
                      >
                        {message.text}
                      </Text>
                    </Flex>
                  </Flex>
                ))}
                
                {isTyping && (
                  <Flex justifyContent="flex-start">
                    <Flex
                      padding="s"
                      radius="m"
                      background="neutral-weak"
                      alignItems="center"
                    >
                      <Text variant="body-default-xs" onBackground="neutral-weak">
                        Typing...
                      </Text>
                    </Flex>
                  </Flex>
                )}
                <div ref={messagesEndRef} />
              </Flex>
            </div>

            <Flex gap="s" alignItems="center">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isTyping}
                style={{ flex: 1 }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                variant="primary"
                size="s"
              >
                ➤
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </div>
  );
}
