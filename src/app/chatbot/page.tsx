'use client';

import Chatbot from '@/components/chatbot';

export default function ChatbotPage() {
    return (
        <div className="flex flex-col h-screen bg-background">
          <header className="p-4 border-b shrink-0">
            <h1 className="text-xl font-bold">Saarthi Chat</h1>
            <p className="text-muted-foreground text-sm">Your friendly mental health companion.</p>
          </header>
          <main className="flex-1 overflow-y-auto">
              <Chatbot />
          </main>
        </div>
    )
}
