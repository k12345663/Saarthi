
'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartPulse, Bot, Users, BookOpen, ShieldCheck, Search, MessageSquare, PieChart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center shadow-sm sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold tracking-tighter">Saarthi</span>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                How It Works
            </Link>
             <Button asChild size="sm" variant="outline">
                <Link href="/login">Sign In</Link>
             </Button>
        </nav>
        <div className="lg:hidden ml-auto">
             <Button asChild size="sm">
                <Link href="/login">Get Started</Link>
             </Button>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/5 via-background to-accent/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
                    Your Mental Wellness Companion
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Saarthi is a private, stigma-free, and supportive space for students. Take quick assessments, talk to our friendly chatbot, or connect with peers—all anonymously.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="shadow-lg hover:shadow-primary/20 transition-shadow">
                    <Link href="/login">Sign in with College ID</Link>
                  </Button>
                  <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-shadow">
                    <Link href="/assessment">Continue Anonymously</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-full max-w-md">
                    <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/20 rounded-full filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-20 -right-20 w-32 h-32 bg-secondary rounded-full filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                    <HeartPulse className="relative w-full h-auto text-primary opacity-20" size={300} strokeWidth={0.5}/>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">A Safe Space for Students</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Saarthi provides confidential and culturally-sensitive tools to help you navigate the pressures of student life.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              <div className="grid gap-1 text-center">
                <ShieldCheck className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Private & Anonymous</h3>
                <p className="text-sm text-muted-foreground">Choose to sign in with your college ID or continue anonymously. Your privacy is our priority.</p>
              </div>
              <div className="grid gap-1 text-center">
                <Search className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Quick Assessments</h3>
                <p className="text-sm text-muted-foreground">Take a 2-minute assessment (PHQ-9/GAD-7) to understand your mental state and get instant, helpful tips.</p>
              </div>
              <div className="grid gap-1 text-center">
                <Bot className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">24/7 Chatbot Support</h3>
                <p className="text-sm text-muted-foreground">Our AI companion, Saathi, is always available for a friendly chat or to guide you through coping exercises.</p>
              </div>
               <div className="grid gap-1 text-center">
                <Users className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Community Forum</h3>
                <p className="text-sm text-muted-foreground">Connect with fellow students in our moderated, anonymous community. Share experiences and find support.</p>
              </div>
              <div className="grid gap-1 text-center">
                <BookOpen className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Cultural Resources</h3>
                <p className="text-sm text-muted-foreground">Access a library of videos, audio, and courses tailored to your cultural and regional background.</p>
              </div>
              <div className="grid gap-1 text-center">
                <PieChart className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Personalized Dashboard</h3>
                <p className="text-sm text-muted-foreground">Signed-in users can track their progress over time, view trends, and get personalized recommendations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Getting started with Saarthi is simple and takes just a few minutes.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-3xl gap-12 mt-12 lg:grid-cols-3 lg:gap-16">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">1</div>
                        <h3 className="text-xl font-bold mb-2">Take an Assessment</h3>
                        <p className="text-muted-foreground">Start with a quick, confidential check-in to understand your current emotional state.</p>
                    </div>
                     <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">2</div>
                        <h3 className="text-xl font-bold mb-2">Get Instant Insights</h3>
                        <p className="text-muted-foreground">Receive a plain-language result, personalized coping tips, and suggestions for next steps.</p>
                    </div>
                     <div className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">3</div>
                        <h3 className="text-xl font-bold mb-2">Explore Resources</h3>
                        <p className="text-muted-foreground">Chat with our AI, book a call, join the community, or explore our library of cultural content.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <footer className="bg-background border-t">
        <div className="container mx-auto py-6 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-primary" />
                <span className="font-semibold">Saarthi</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">© SIH Team Saarthi. All rights reserved.</p>
            <nav className="flex gap-4 mt-4 md:mt-0">
                <Link href="#" className="text-sm hover:underline" prefetch={false}>Privacy Policy</Link>
                <Link href="#" className="text-sm hover:underline" prefetch={false}>Terms of Service</Link>
                <Link href="/iqac/login" className="text-sm hover:underline" prefetch={false}>IQAC Login</Link>
            </nav>
        </div>
      </footer>
      <style jsx>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
