'use client';
import Chatbot from '@/components/chatbot';

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">Welcome to Saarthi</h1>
        <p className="text-muted-foreground">Your friendly mental health companion. How can I help you today?</p>
      </header>
      <main className="flex-1 overflow-y-auto">
          <Chatbot />
      </main>
    </div>
  );
}
