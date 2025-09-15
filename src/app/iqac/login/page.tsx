
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HeartPulse } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function IqacLoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle IQAC auth here
    router.push('/iqac');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center justify-center" prefetch={false}>
            <HeartPulse className="h-8 w-8 text-primary" />
            <span className="ml-3 text-3xl font-bold tracking-tighter">Saarthi</span>
          </Link>
        </div>
        <Card className="shadow-2xl shadow-primary/10">
          <CardHeader>
            <CardTitle className="text-2xl">IQAC Analytics Login</CardTitle>
            <CardDescription>Enter your credentials to access the student wellness dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="iqac-member@lths.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
