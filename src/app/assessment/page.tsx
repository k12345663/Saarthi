'use client';

import { useState, useEffect, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { HeartPulse, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

const questions = [
  { id: 'q1', text: 'Little interest or pleasure in doing things' },
  { id: 'q2', text: 'Feeling down, depressed, or hopeless' },
  { id: 'q3', text: 'Trouble falling or staying asleep, or sleeping too much' },
  { id: 'q4', text: 'Feeling tired or having little energy' },
  { id: 'q5', text: 'Poor appetite or overeating' },
  { id: 'q6', text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down' },
  { id: 'q7', text: 'Trouble concentrating on things, such as reading the newspaper or watching television' },
  { id: 'q8', text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual' },
  { id: 'q9', text: 'Thoughts that you would be better off dead or of hurting yourself in some way' },
];

const options = [
    { value: '0', label: 'Not at all' },
    { value: '1', label: 'Several days' },
    { value: '2', label: 'More than half the days' },
    { value: '3', label: 'Nearly every day' },
];

function Assessment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(true);

  useEffect(() => {
    const signedInParam = searchParams.get('signedin');
    setIsSignedIn(signedInParam === 'true');
    setIsAnonymous(signedInParam !== 'true');
  }, [searchParams]);

  const handleValueChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    // Automatically move to the next question
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Wait for user to see the last selection before calculating score
             setTimeout(() => handleSubmit(), 200);
        }
    }, 300);
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
        // This check is less likely to fail with auto-advance, but good to have
        return;
    }
    const totalScore = Object.values(answers).reduce((acc, val) => acc + parseInt(val, 10), 0);
    setScore(totalScore);
  };
  
  const getDepressionSeverity = (score: number) => {
    if (score <= 4) return { level: "None-minimal", advice: "Your score suggests you're doing well. Keep up the healthy habits!", coping: ["Practice mindfulness for 5 minutes.", "Connect with a friend today."] };
    if (score <= 9) return { level: "Mild", advice: "You may be experiencing mild symptoms. Consider talking to a friend or trying some relaxation techniques.", coping: ["Try a guided breathing exercise.", "Go for a 15-minute walk."] };
    if (score <= 14) return { level: "Moderate", advice: "Your symptoms are moderate. It might be helpful to talk to a professional.", coping: ["Book a session with a counsellor.", "Journal your thoughts for 10 minutes."] };
    if (score <= 19) return { level: "Moderately Severe", advice: "Your score indicates moderately severe symptoms. Please consider seeking professional help soon. You are not alone.", coping: ["Book a session with a counsellor now.", "Reach out to the community forum for support." ]};
    return { level: "Severe", advice: "Your score is in the severe range. It is very important to seek professional help immediately. Please call a helpline or book a session now.", coping: ["Call a crisis helpline immediately.", "Contact your campus counsellor now."] };
  };

  const handleContinue = () => {
    const destination = isSignedIn ? '/dashboard' : `/dashboard?anonymous=true`;
    router.push(destination);
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];

  if (score !== null) {
    const { level, advice, coping } = getDepressionSeverity(score);
    const ctaText = isSignedIn ? "Open Your Dashboard" : "Continue Anonymously";

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
          <Card className="w-full max-w-lg shadow-2xl shadow-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Assessment Result</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg font-semibold">Your score is: <span className='text-primary font-bold text-2xl'>{score}</span></p>
              <p className="text-xl font-bold mt-2 text-primary">{level}</p>
              <p className="mt-4 text-muted-foreground">{advice}</p>

              <div className="my-6 space-y-3 text-left">
                  <h4 className="font-semibold text-center">Personalized Coping Tips</h4>
                  {coping.map((tip, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                          <span className='text-primary'>✓</span>
                          <p>{tip}</p>
                      </div>
                  ))}
              </div>

               {answers.q9 !== '0' && (
                <div className="mt-4 p-4 bg-destructive/10 border border-destructive/50 text-destructive rounded-lg">
                  <p className="font-bold">⚠️ Important:</p>
                  <p>You've indicated thoughts of self-harm. Please seek help immediately. You can call Tele-MANAS Helpline: 14416 / 1800-891-4416.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex-col gap-4 px-6 pb-6">
              <Button onClick={handleContinue} className="w-full">
                {ctaText}
              </Button>
              <Button onClick={() => { setScore(null); setAnswers({}); setCurrentQuestionIndex(0); }} variant="outline" className="w-full">
                Retake Assessment
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-background p-4">
        <div className="w-full max-w-2xl">
            <header className="py-4 flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => currentQuestionIndex > 0 ? setCurrentQuestionIndex(currentQuestionIndex - 1) : router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <Link href="/" className="flex items-center justify-center" prefetch={false}>
                    <HeartPulse className="h-6 w-6 text-primary" />
                    <span className="ml-2 text-xl font-bold tracking-tighter">Saarthi</span>
                </Link>
                <div className="w-10"></div>
            </header>

            <main>
                <Card className="shadow-2xl shadow-primary/10 overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-2xl">Mental Wellness Check-in</CardTitle>
                    <CardDescription>
                    Over the last 2 weeks, how often have you been bothered by any of the following problems?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full mb-6">
                        <Progress value={progress} className="w-full h-2" />
                        <p className="text-right text-sm text-muted-foreground mt-2">{currentQuestionIndex + 1} of {questions.length}</p>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                        <div key={currentQuestion.id} className="space-y-4">
                        <Label className="text-base font-semibold">{currentQuestionIndex + 1}. {currentQuestion.text}</Label>
                        <RadioGroup onValueChange={(value) => handleValueChange(currentQuestion.id, value)} value={answers[currentQuestion.id] || ''} className="space-y-2">
                            {options.map((option) => (
                            <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors">
                                <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} />
                                <Label htmlFor={`${currentQuestion.id}-${option.value}`} className="w-full cursor-pointer">{option.label}</Label>
                            </div>
                            ))}
                        </RadioGroup>
                        </div>
                    </form>
                </CardContent>
                </Card>
            </main>
        </div>
    </div>
  );
}

function AssessmentPage() {
  return (
    <Suspense fallback={<AssessmentPageSkeleton />}>
      <Assessment />
    </Suspense>
  );
}

function AssessmentPageSkeleton() {
  return (
     <div className="flex flex-col items-center min-h-screen bg-background p-4">
        <div className="w-full max-w-2xl">
            <header className="py-4 flex items-center justify-between">
                <Skeleton className="h-10 w-10" />
                <div className="flex items-center justify-center">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-24 ml-2" />
                </div>
                <div className="w-10"></div>
            </header>
            <main>
                <Card className="shadow-2xl shadow-primary/10 overflow-hidden">
                <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                    <div className="w-full mb-6">
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-4 w-1/4 mt-2 ml-auto" />
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-4">
                        <Skeleton className="h-6 w-full" />
                        <div className="space-y-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="flex items-center space-x-3 p-3 border rounded-lg">
                                    <Skeleton className="h-4 w-4 rounded-full" />
                                    <Skeleton className="h-4 w-1/3" />
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                </CardContent>
                </Card>
            </main>
        </div>
    </div>
  )
}

export default AssessmentPage;
