
'use client';

import { Suspense } from 'react';
import DashboardClient from './dashboard-client';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';

function DashboardPageSkeleton() {
    return (
    <div className="flex flex-col bg-background min-h-screen p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-full" />
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card>
                  <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                  <CardContent><Skeleton className="h-10 w-full" /></CardContent>
                  <CardFooter><Skeleton className="h-10 w-full" /></CardFooter>
               </Card>
               <Card>
                  <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                  <CardContent><Skeleton className="h-10 w-full" /></CardContent>
                  <CardFooter><Skeleton className="h-10 w-full" /></CardFooter>
               </Card>
             </div>
          {/* Card 1 */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-1/4 mb-2" />
              <Skeleton className="h-4 w-1/3 mb-4" />
              <Skeleton className="h-2 w-full" />
            </CardContent>
          </Card>
          {/* Card 2 */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-1/4 mb-2" />
              <Skeleton className="h-4 w-1/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
          {/* Card 3 */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        </div>
        {/* Right Column */}
        <div className="space-y-6">
          {/* Card 4 */}
          <Card>
            <CardHeader>
               <Skeleton className="h-6 w-1/2 mb-2" />
               <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
          {/* Card 5 */}
          <Card>
            <CardHeader>
               <Skeleton className="h-6 w-1/2 mb-2" />
               <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardPageSkeleton />}>
      <DashboardClient />
    </Suspense>
  );
}
