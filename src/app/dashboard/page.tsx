'use client';

import {
  BarChart,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Bar,
  Line,
  Tooltip,
  Legend,
} from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  MessageSquare,
  Newspaper,
  TrendingUp,
  Heart,
  Bot,
} from 'lucide-react';
import Chatbot from '@/components/chatbot';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

const latestScore = {
  score: 8,
  level: 'Mild',
  advice:
    "You're showing signs of improvement. Keep focusing on self-care and using the coping strategies that work for you.",
};

const mentalHealthScore = 72;

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    setIsAnonymous(searchParams.get('anonymous') === 'true');
  }, [searchParams]);

  if (isAnonymous) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <header className="p-4 border-b">
          <h1 className="text-xl font-bold">Welcome to Saarthi</h1>
          <p className="text-muted-foreground">
            Your friendly mental health companion. How can I help you today?
          </p>
        </header>
        <main className="flex-1 overflow-y-auto">
          <Chatbot />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <header className="p-4 md:p-6 lg:p-8 bg-card border-b">
        <h1 className="text-2xl font-bold">Saarthi Dashboard</h1>
        <p className="text-muted-foreground">
          Your privacy-first mental health support system
        </p>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Mental Health Score Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Mental Health Score</CardTitle>
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5 text-muted-foreground" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">{mentalHealthScore}</span>
                <span className="text-2xl text-muted-foreground">/100</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Good mental state</p>
              <Progress value={mentalHealthScore} className="mt-4 h-2" />
            </CardContent>
          </Card>

          {/* Last Assessment Card */}
          <Card>
            <CardHeader>
              <CardTitle>Last Assessment</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xl font-semibold">PHQ-9</p>
                <p className="text-muted-foreground">Mild depression (5/27)</p>
            </CardContent>
            <CardFooter>
                 <Button variant="outline" className="w-full" asChild>
                    <Link href="/assessment?signedin=true">Take New Test</Link>
                </Button>
            </CardFooter>
          </Card>

          {/* Talk to Saarthi Card */}
          <Card>
            <CardHeader>
                <div className='flex items-center gap-2'>
                    <Bot className="w-6 h-6" />
                    <CardTitle>Talk to Saarthi</CardTitle>
                </div>
              <CardDescription>
                Get immediate support from your privacy-first mental health assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/chatbot">Start Chat</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Book Appointment Card */}
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Calendar className="w-6 h-6" />
                <CardTitle>Book Appointment</CardTitle>
              </div>
              <CardDescription>
                Schedule a session with a mental health professional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/book-appointment">Book Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
