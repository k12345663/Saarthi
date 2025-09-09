'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { HeartPulse, MessageSquare, CalendarPlus, LogOut, Settings, UserCircle, BotMessageSquare, BookOpen, LayoutDashboard } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardLayoutSkeleton() {
    return (
    <div className="flex bg-background min-h-screen">
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex flex-col justify-between w-64 p-2 border-r">
          <div>
            <div className="p-2">
                <Skeleton className="h-8 w-32" />
            </div>
            <div className='p-2 mt-2 space-y-1'>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div>
              <div className="p-2 space-y-1">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
              </div>
              <div className="p-2 mt-2">
                  <Skeleton className="h-12 w-full" />
              </div>
          </div>
      </div>
      {/* Main Content Skeleton */}
      <div className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="mb-6">
            <Skeleton className="h-8 w-1/3 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-lg border bg-card"><Skeleton className="h-32 w-full" /></div>
              <div className="p-6 rounded-lg border bg-card"><Skeleton className="h-32 w-full" /></div>
            </div>
            <div className="space-y-6">
              <div className="p-6 rounded-lg border bg-card"><Skeleton className="h-64 w-full" /></div>
            </div>
          </div>
      </div>
    </div>
  );
}


function DashboardLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    setIsAnonymous(searchParams.get('anonymous') === 'true');
  }, [searchParams]);
  
  const navQuery = isAnonymous ? '?anonymous=true' : '';

  const signedInMenuItems = [
    { href: `/dashboard${navQuery}`, label: 'Dashboard', icon: LayoutDashboard },
    { href: `/chatbot${navQuery}`, label: 'Chatbot', icon: BotMessageSquare },
    { href: `/book-appointment${navQuery}`, label: 'Book Appointment', icon: CalendarPlus },
    { href: `/community${navQuery}`, label: 'Community', icon: MessageSquare },
    { href: `/cultural-content${navQuery}`, label: 'Cultural Content', icon: BookOpen },
  ];
  
  const anonymousMenuItems = [
      { href: `/chatbot${navQuery}`, label: 'Chatbot', icon: BotMessageSquare },
      { href: `/book-appointment${navQuery}`, label: 'Book Appointment', icon: CalendarPlus },
  ];

  const menuItems = isAnonymous ? anonymousMenuItems : signedInMenuItems;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 p-2">
                    <HeartPulse className="w-6 h-6 text-primary" />
                    <span className="text-xl font-semibold">Saarthi</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href} passHref>
                                <SidebarMenuButton isActive={pathname === item.href.split('?')[0]}>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                {!isAnonymous && (
                  <>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <Settings />
                                <span>Settings</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton onClick={() => router.push('/')}>
                                <LogOut />
                                <span>Logout</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 m-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>
                                <UserCircle/>
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">Student</span>
                            <span className="text-xs text-muted-foreground">barhate@lths.com</span>
                        </div>
                    </div>
                  </>
                )}
                 {isAnonymous && (
                    <>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton onClick={() => router.push('/')}>
                                <LogOut />
                                <span>Exit</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 m-2">
                        <Avatar>
                            <AvatarFallback>
                                <UserCircle/>
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="font-semibold text-sm">Anonymous</span>
                        </div>
                    </div>
                    </>
                )}
            </SidebarFooter>
        </Sidebar>
        <main className="flex-1 w-full overflow-y-auto">
           {children}
        </main>
      </div>
    </SidebarProvider>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<DashboardLayoutSkeleton />}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </Suspense>
  );
}