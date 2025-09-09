'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Calendar, CalendarCheck2, Heart } from 'lucide-react';
import Chatbot from '@/components/chatbot';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
             {/* Mental Health Score Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mental Health Score</CardTitle>
                <Heart className="w-5 h-5 text-muted-foreground" />
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

             {/* Talk to Saarthi Card - Removed button */}
            <Card>
              <CardHeader>
                  <div className='flex items-center gap-2'>
                      <Bot className="w-6 h-6" />
                      <CardTitle>Talk to Saarthi</CardTitle>
                  </div>
                <CardDescription>
                  Get immediate support from your privacy-first mental health assistant. Access the chat via the sidebar.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Book Appointment Card - Removed button */}
            <Card>
              <CardHeader>
                <div className='flex items-center gap-2'>
                  <Calendar className="w-6 h-6" />
                  <CardTitle>Book Appointment</CardTitle>
                </div>
                <CardDescription>
                  Schedule a session with a mental health professional via the sidebar.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Upcoming Appointments Card */}
            <Card>
              <CardHeader>
                <div className='flex items-center gap-2'>
                  <CalendarCheck2 className="w-6 h-6" />
                  <CardTitle>Upcoming Appointments</CardTitle>
                </div>
                <CardDescription>
                  Your scheduled sessions with our counsellors.
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                  <div className='flex items-center gap-4 p-3 rounded-lg bg-accent/50'>
                    <Calendar className='w-5 h-5 text-primary'/>
                    <div>
                      <p className='font-semibold'>Dr. Anjali Sharma</p>
                      <p className='text-sm text-muted-foreground'>Tomorrow at 2:00 PM</p>
                    </div>
                  </div>
                   <div className='flex items-center gap-4 p-3 rounded-lg bg-accent/50'>
                    <Calendar className='w-5 h-5 text-primary'/>
                    <div>
                      <p className='font-semibold'>Mr. Rohan Gupta</p>
                      <p className='text-sm text-muted-foreground'>Next week, Tuesday at 11:00 AM</p>
                    </div>
                  </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
