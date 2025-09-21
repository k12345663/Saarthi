
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HeartPulse, Copy, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

function generateContinuityCode() {
    // A simple 6-character alphanumeric code generator
    const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}


export default function AnonymousPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [continuityCode, setContinuityCode] = useState('');
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleStartFresh = () => {
    const generatedCode = generateContinuityCode();
    setNewCode(generatedCode);
    setShowCodeDialog(true);
  };
  
  const handleContinueWithCode = () => {
    // In a real app, you would validate the code here
    if (continuityCode) {
        router.push(`/assessment?anonymous=true&code=${continuityCode}`);
    } else {
        toast({
            title: "Error",
            description: "Please enter a continuity code.",
            variant: "destructive"
        })
    }
  }

  const handleDialogContinue = () => {
    router.push(`/assessment?anonymous=true&code=${newCode}`);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(newCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

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
            <CardTitle className="text-2xl">Anonymous Access</CardTitle>
            <CardDescription>You can start a new session or resume a previous one using a continuity code.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <Button onClick={handleStartFresh} className="w-full" size="lg">Start a Fresh Anonymous Session</Button>
            
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or resume session</span>
                </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="continuity-code">Enter Your Continuity Code</Label>
              <div className="flex gap-2">
                <Input
                    id="continuity-code"
                    placeholder="e.g., AB12CD"
                    value={continuityCode}
                    onChange={(e) => setContinuityCode(e.target.value.toUpperCase())}
                    />
                <Button onClick={handleContinueWithCode} variant="secondary">Resume</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
       <AlertDialog open={showCodeDialog} onOpenChange={setShowCodeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Your New Continuity Code</AlertDialogTitle>
            <AlertDialogDescription>
              Please save this code. You can use it later to resume your anonymous session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
            <div className="flex items-center justify-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold tracking-widest">{newCode}</p>
                <Button variant="ghost" size="icon" onClick={copyToClipboard} className="ml-4">
                    {copied ? <Check className="text-green-500"/> : <Copy />}
                </Button>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDialogContinue} className="w-full">Continue to Assessment</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
