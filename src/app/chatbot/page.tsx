
'use client';

import Chatbot from '@/components/chatbot';
import { Card, CardContent } from '@/components/ui/card';

export default function ChatbotPage() {
    return (
        <div className="flex items-center justify-center min-h-dvh bg-muted/40 p-0 md:p-4">
          <Card className="w-full h-dvh md:h-[80vh] md:max-w-2xl md:shadow-2xl md:rounded-2xl overflow-hidden">
            <CardContent className="p-0 h-full">
                <Chatbot />
            </CardContent>
          </Card>
        </div>
    )
}
