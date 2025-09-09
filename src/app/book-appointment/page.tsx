
'use client';
import { Suspense } from 'react';
import BookAppointmentForm from './book-appointment-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function BookAppointmentSkeleton() {
  return (
     <div className="container mx-auto p-4 md:p-8 flex justify-center">
      <Card className="w-full max-w-2xl shadow-2xl shadow-primary/10">
        <CardHeader>
          <CardTitle>Book a Counselling Session</CardTitle>
          <CardDescription>Fill out the form below to schedule your appointment.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            <div className="space-y-3">
                <Skeleton className="h-4 w-1/3" />
                <div className="flex flex-col space-y-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            </div>
             <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-20 w-full" />
            </div>
            <Skeleton className="h-10 w-1/3" />
        </CardContent>
      </Card>
    </div>
  )
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={<BookAppointmentSkeleton />}>
      <BookAppointmentForm />
    </Suspense>
  );
}
