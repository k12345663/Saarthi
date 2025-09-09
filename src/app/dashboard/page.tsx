'use client';

import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, Bar, Line, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, MessageSquare, Newspaper, TrendingUp } from 'lucide-react';
import Chatbot from '@/components/chatbot';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const scoreHistory = [
  { name: 'Jan', score: 15 },
  { name: 'Feb', score: 12 },
  { name: 'Mar', score: 14 },
  { name: 'Apr', score: 10 },
  { name: 'May', score: 8 },
];

const latestScore = {
    score: 8,
    level: "Mild",
    advice: "You're showing signs of improvement. Keep focusing on self-care and using the coping strategies that work for you."
}

const updates = [
  { id: 1, title: "Wellness Workshop: Managing Exam Stress", date: "May 25, 2024" },
  { id: 2, title: "New Yoga & Mindfulness course available", date: "May 22, 2024" },
  { id: 3, title: "Campus Mental Health Awareness Drive", date: "May 20, 2024" },
];

const nextSteps = [
    { id: 1, title: "Explore community posts on 'Exam Stress'", href: "/community", icon: MessageSquare },
    { id: 2, title: "Try the 'Introduction to Yoga' course", href: "/cultural-content", icon: BookOpen },
    { id: 3, title: "Revisit your assessment in 2 weeks", href: "/assessment?signedin=true", icon: TrendingUp },
]

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
            <p className="text-muted-foreground">Your friendly mental health companion. How can I help you today?</p>
          </header>
          <main className="flex-1 overflow-y-auto">
              <Chatbot />
          </main>
        </div>
      )
  }

  return (
    <div className="flex flex-col bg-background">
       <header className="p-4 border-b bg-card">
        <h1 className="text-xl font-bold">My Analysis Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a summary of your wellness journey.</p>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8 grid gap-8 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            {/* Score trend */}
            <Card>
                <CardHeader>
                    <CardTitle>Your Score Trend</CardTitle>
                    <CardDescription>Your PHQ-9 scores over the last 5 months.</CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={scoreHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 27]}/>
                            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }}/>
                            <Legend />
                            <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Next steps */}
             <Card>
                <CardHeader>
                    <CardTitle>Suggested Next Steps</CardTitle>
                    <CardDescription>Personalized recommendations to support your journey.</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {nextSteps.map(step => (
                         <Link href={step.href} key={step.id}>
                            <div className="p-4 border rounded-lg h-full flex flex-col items-center text-center hover:bg-accent transition-colors">
                                <step.icon className="h-8 w-8 text-primary mb-2"/>
                                <p className="font-semibold text-sm">{step.title}</p>
                            </div>
                        </Link>
                    ))}
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
            {/* Latest score */}
            <Card className="bg-primary/10">
                <CardHeader>
                    <CardTitle>Latest Assessment</CardTitle>
                     <CardDescription>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold text-primary">{latestScore.score}</p>
                    <p className="text-lg font-semibold mt-1">{latestScore.level}</p>
                    <p className="text-sm text-muted-foreground mt-2">{latestScore.advice}</p>
                    <Button variant="outline" className="w-full mt-4" asChild>
                        <Link href="/assessment?signedin=true">Retake Assessment</Link>
                    </Button>
                </CardContent>
            </Card>
            
            {/* Updates */}
            <Card>
                 <CardHeader>
                    <CardTitle>Updates & Events</CardTitle>
                    <CardDescription>Latest news from your campus.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {updates.map(update => (
                        <div key={update.id} className="flex items-start gap-3">
                            <Newspaper className="h-5 w-5 mt-1 text-muted-foreground"/>
                            <div>
                                <p className="font-semibold text-sm">{update.title}</p>
                                <p className="text-xs text-muted-foreground">{update.date}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}