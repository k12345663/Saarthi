
'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold tracking-tighter">Saarthi</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
                    Your Mental Wellness Companion
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Saarthi is a safe and supportive space for students. Talk, track your mood, and find resources to help you thrive.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
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
      </main>
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
