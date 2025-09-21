
'use client';

import Chatbot from '@/components/chatbot';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HeartPulse } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function ChatbotPage() {
    return (
        <div className="flex items-center justify-center h-dvh bg-muted/40 p-0 md:p-4">
          <Card className="w-full h-full md:h-[80vh] md:max-w-2xl md:shadow-2xl md:rounded-2xl overflow-hidden flex flex-col">
             <CardHeader className="p-4 border-b flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                    <HeartPulse className="w-6 h-6 text-primary" />
                    <div>
                        <CardTitle className="text-xl font-bold">Saarthi Chat</CardTitle>
                        <CardDescription className="text-sm">Your friendly mental health companion.</CardDescription>
                    </div>
                </div>
                <ThemeToggle />
            </CardHeader>
            <CardContent className="p-0 flex-1">
                <Chatbot />
            </CardContent>
          </Card>
        </div>
    )
}
