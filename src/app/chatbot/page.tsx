
'use client';

import Chatbot from '@/components/chatbot';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HeartPulse } from 'lucide-react';

export default function ChatbotPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/40 p-0 md:p-4">
          <Card className="w-full h-screen md:h-[80vh] md:max-w-2xl md:shadow-2xl md:rounded-2xl overflow-hidden">
             <CardHeader className="p-4 border-b">
                <div className="flex items-center gap-3">
                    <HeartPulse className="w-6 h-6 text-primary" />
                    <div>
                        <CardTitle className="text-xl font-bold">Saarthi Chat</CardTitle>
                        <CardDescription className="text-sm">Your friendly mental health companion.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-92px)]">
                <Chatbot />
            </CardContent>
          </Card>
        </div>
    )
}
