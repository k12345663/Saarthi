'use client';

import { useState, useRef, useEffect, forwardRef } from 'react';
import { chatbotSupport } from '@/ai/flows/supportive-chatbot';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Bot, Zap } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardDescription, CardTitle } from './ui/card';
import { HeartPulse } from 'lucide-react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const quickReplies = [
  { label: 'Breathing exercise', command: '/exercise' },
  { label: 'Sleep tips', command: '/sleep' },
  { label: 'Book a session', command: '/book' },
  { label: 'Find resources', command: '/resources' },
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! I am Saarthi, your friendly mental health companion. How are you feeling today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('english');
  const viewportRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (messageText: string) => {
    if (messageText.trim() === '') return;

    const userMessage: Message = { text: messageText, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = [...messages, userMessage].slice(-10).map(m => `${m.sender}: ${m.text}`).join('\n');
      const result = await chatbotSupport({ message: history, language });
      const botMessage: Message = { text: result.response, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        text: 'Sorry, I am having trouble connecting. Please try again later.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendMessage(input);
  };
  
  const handleQuickReply = (command: string) => {
    sendMessage(command);
  }

  useEffect(() => {
    if (viewportRef.current) {
        viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
            <HeartPulse className="w-6 h-6 text-primary" />
            <div>
                <CardTitle className="text-xl font-bold">Saarthi Chat</CardTitle>
                <CardDescription className="text-sm">Your friendly mental health companion.</CardDescription>
            </div>
        </div>
        <div className="w-36">
            <Select onValueChange={setLanguage} defaultValue={language}>
                <SelectTrigger>
                    <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="hinglish">Hinglish</SelectItem>
                    <SelectItem value="dogri">Dogri</SelectItem>
                    <SelectItem value="kashmiri">Kashmiri</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>
        <ScrollArea className="flex-1 p-4" viewportRef={viewportRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-3',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.sender === 'bot' && (
                  <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                    <AvatarFallback>
                      <Bot />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xs rounded-lg p-3 text-sm md:max-w-md',
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                  <AvatarFallback>
                    <Bot />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-xs rounded-lg p-3 text-sm bg-muted md:max-w-md">
                  <div className="flex items-center space-x-1">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Quick Replies Section */}
         <div className="p-2 border-t bg-background">
            <div className="flex flex-wrap items-center justify-center gap-2">
                 {quickReplies.map((reply) => (
                    <Button 
                        key={reply.command} 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleQuickReply(reply.command)}
                        disabled={isLoading}
                        className="text-xs"
                    >
                        <Zap className="w-3 h-3 mr-2" />
                        {reply.label}
                    </Button>
                ))}
            </div>
        </div>

        <div className="flex items-center gap-2 p-4 border-t bg-background">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
    </div>
  );
}
