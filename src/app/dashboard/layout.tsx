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
import { useEffect, useState } from 'react';

export default function DashboardLayout({
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
  );
}
