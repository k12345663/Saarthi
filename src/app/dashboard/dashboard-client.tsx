
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarCheck2, Heart, Bell, History, Bot, CalendarPlus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import Chatbot from '@/components/chatbot';

const mentalHealthScore = 72;

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    // searchParams.get will be null on initial render, so we check for the string 'true'
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
        <div className="flex items-center gap-3">
          <Heart className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Saarthi Dashboard</h1>
            <p className="text-muted-foreground">
              Your privacy-first mental health support system
            </p>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
             {/* Quick Actions */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className='flex items-center gap-2'>
                        <Bot className='w-6 h-6 text-primary' />
                        <CardTitle>Chat with Saarthi</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Talk to our friendly AI for support, or to explore coping strategies.</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className='w-full'>
                      <Link href="/chatbot">Start Chat</Link>
                    </Button>
                  </CardFooter>
               </Card>
               <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                     <div className='flex items-center gap-2'>
                        <CalendarPlus className='w-6 h-6 text-primary' />
                        <CardTitle>Book a Session</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Schedule a confidential appointment with a professional counsellor.</p>
                  </CardContent>
                  <CardFooter>
                     <Button asChild className='w-full'>
                      <Link href="/book-appointment">Book Now</Link>
                    </Button>
                  </CardFooter>
               </Card>
             </div>


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

             {/* Reminders Card */}
            <Card>
              <CardHeader>
                <div className='flex items-center gap-2'>
                  <Bell className="w-6 h-6" />
                  <CardTitle>Reminders</CardTitle>
                </div>
                 <CardDescription>
                  Upcoming tasks and events to support your wellness journey.
                </CardDescription>
              </CardHeader>
               <CardContent className='space-y-4'>
                  <div className='flex items-center justify-between gap-4 p-3 rounded-lg bg-accent/50'>
                    <div className='flex items-center gap-4'>
                        <Bell className='w-5 h-5 text-primary'/>
                        <div>
                          <p className='font-semibold'>Journal Entry</p>
                          <p className='text-sm text-muted-foreground'>Due today</p>
                        </div>
                    </div>
                    <Button variant="secondary" size="sm">View</Button>
                  </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-6">
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
                  <div className='flex items-start justify-between gap-4 p-3 rounded-lg bg-accent/50'>
                    <div className='flex items-center gap-4'>
                      <Calendar className='w-5 h-5 text-primary mt-1'/>
                      <div>
                        <p className='font-semibold'>Dr. Anjali Sharma</p>
                        <p className='text-sm text-muted-foreground'>Tomorrow at 2:00 PM</p>
                      </div>
                    </div>
                     <Button variant="ghost" size="sm">Reschedule</Button>
                  </div>
                   <div className='flex items-start justify-between gap-4 p-3 rounded-lg bg-accent/50'>
                    <div className='flex items-center gap-4'>
                        <Calendar className='w-5 h-5 text-primary mt-1'/>
                        <div>
                          <p className='font-semibold'>Mr. Rohan Gupta</p>
                          <p className='text-sm text-muted-foreground'>Next week, Tuesday at 11:00 AM</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm">Reschedule</Button>
                  </div>
              </CardContent>
            </Card>
            
            {/* Appointment History Card */}
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-2'>
                        <History className="w-6 h-6" />
                        <CardTitle>Appointment History</CardTitle>
                    </div>
                    <CardDescription>
                        A log of your past sessions.
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='flex items-center gap-4 p-3 rounded-lg bg-accent/50 opacity-70'>
                        <CalendarCheck2 className='w-5 h-5 text-muted-foreground'/>
                        <div>
                        <p className='font-semibold'>Dr. Anjali Sharma</p>
                        <p className='text-sm text-muted-foreground'>Completed on May 15, 2024</p>
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

    