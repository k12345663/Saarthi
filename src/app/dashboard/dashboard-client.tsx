
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Bell, History, Bot, CalendarPlus, User } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { RescheduleDialog } from '@/components/reschedule-dialog';

const mentalHealthScore = 72;

const upcomingAppointments = [
    {
      id: "appt1",
      counsellor: "Dr. Anjali Sharma",
      datetime: "Tomorrow at 2:00 PM",
      status: "upcoming"
    },
    {
      id: "appt2",
      counsellor: "Mr. Rohan Gupta",
      datetime: "Next week, Tuesday at 11:00 AM",
      status: "upcoming"
    },
     {
      id: "appt3",
      counsellor: "Dr. Anjali Sharma",
      datetime: "Completed on May 15, 2024",
      status: "completed"
    }
]


function SignedInDashboard() {
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<(typeof upcomingAppointments)[0] | null>(null);

  const handleRescheduleClick = (appointment: (typeof upcomingAppointments)[0]) => {
    setSelectedAppointment(appointment);
    setShowRescheduleDialog(true);
  }

  return (
    <>
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
                <Bell className='w-5 h-5 text-primary' />
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
              <History className="w-6 h-6" />
              <CardTitle>Appointment History</CardTitle>
            </div>
            <CardDescription>
              Your scheduled sessions with our counsellors.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {upcomingAppointments.map((appt) => (
                <div key={appt.id} className={cn('flex items-start justify-between gap-4 p-3 rounded-lg bg-accent/50', appt.status === 'completed' && 'opacity-70')}>
                    <div className='flex items-center gap-4'>
                        {appt.status === 'completed' ? <History className='w-5 h-5 text-muted-foreground mt-1' /> : <User className='w-5 h-5 text-primary mt-1' />}
                        <div>
                        <p className='font-semibold'>{appt.counsellor}</p>
                        <p className='text-sm text-muted-foreground'>{appt.datetime}</p>
                        </div>
                    </div>
                     {appt.status === 'upcoming' && <Button variant="ghost" size="sm" onClick={() => handleRescheduleClick(appt)}>Reschedule</Button>}
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
      {selectedAppointment && (
        <RescheduleDialog 
            isOpen={showRescheduleDialog} 
            onClose={() => setShowRescheduleDialog(false)}
            appointment={selectedAppointment}
        />
      )}
    </>
  );
}

function AnonymousDashboard() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const navQuery = `?anonymous=true&code=${code}`;

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Anonymous Session</CardTitle>
          <CardDescription>
            You are in a private, anonymous session. Your activity will not be saved permanently.
            You can use your continuity code to resume this session later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Your Continuity Code is:</p>
          <p className="text-2xl font-bold tracking-widest text-primary p-2 bg-muted rounded-lg inline-block my-2">{code}</p>
          <p className="text-xs text-muted-foreground mt-2">Keep this code safe to resume your session later.</p>
        </CardContent>
      </Card>

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
              <Link href={`/chatbot${navQuery}`}>Start Chat</Link>
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
              <Link href={`/book-appointment${navQuery}`}>Book Now</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function DashboardClientInternal() {
  const searchParams = useSearchParams();
  const [isAnonymous, setIsAnonymous] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setIsAnonymous(searchParams.get('anonymous') === 'true');
  }, [searchParams]);

  if (isAnonymous === undefined) {
    return (
      <div className="lg:col-span-3">
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  const headerTitle = isAnonymous ? "Anonymous Dashboard" : "Saarthi Dashboard";
  const headerDescription = isAnonymous
    ? "Your private and untracked mental health space."
    : "Your privacy-first mental health support system";

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <header className="p-4 md:p-6 lg:p-8 bg-card border-b">
        <div className="flex items-center gap-3">
          <Heart className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">{headerTitle}</h1>
            <p className="text-muted-foreground">{headerDescription}</p>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {isAnonymous ? <AnonymousDashboard /> : <SignedInDashboard />}
        </div>
      </main>
    </div>
  );
}

export default function DashboardClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardClientInternal />
    </Suspense>
  )
}

    
