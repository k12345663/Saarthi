'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { HeartPulse, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

export default function AssessmentPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleValueChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions.length) {
        alert("Please answer all questions.");
        return;
    }
    const totalScore = Object.values(answers).reduce((acc, val) => acc + parseInt(val, 10), 0);
    setScore(totalScore);
  };
  
  const getDepressionSeverity = (score: number) => {
    if (score <= 4) return { level: "None-minimal", advice: "Your score suggests you're doing well. Keep up the healthy habits!" };
    if (score <= 9) return { level: "Mild", advice: "You may be experiencing mild symptoms. Consider talking to a friend or trying some relaxation techniques." };
    if (score <= 14) return { level: "Moderate", advice: "Your symptoms are moderate. It might be helpful to talk to a professional. Saarthi can help you book a session." };
    if (score <= 19) return { level: "Moderately Severe", advice: "Your score indicates moderately severe symptoms. Please consider seeking professional help soon. You are not alone." };
    return { level: "Severe", advice: "Your score is in the severe range. It is very important to seek professional help immediately. Please call a helpline or book a session now." };
  };

  const progress = (Object.keys(answers).length / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];

  if (score !== null) {
    const { level, advice } = getDepressionSeverity(score);
    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
          <Card className="w-full max-w-lg shadow-2xl shadow-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Assessment Result</CardTitle>
              <CardDescription className="text-center">Based on your PHQ-9 responses.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg font-semibold">Your score is: {score}</p>
              <p className="text-xl font-bold mt-2 text-primary">{level}</p>
              <p className="mt-4 text-muted-foreground">{advice}</p>
               {answers.q9 !== '0' && (
                <div className="mt-4 p-4 bg-destructive/10 border border-destructive/50 text-destructive rounded-lg">
                  <p className="font-bold">⚠️ Important:</p>
                  <p>You've indicated thoughts of self-harm. Please seek help immediately. You can call Tele-MANAS Helpline: 14416 / 1800-891-4416.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button onClick={() => router.push('/dashboard')} className="w-full">
                Go to Dashboard
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
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <Link href="/" className="flex items-center justify-center" prefetch={false}>
                    <HeartPulse className="h-6 w-6 text-primary" />
                    <span className="ml-2 text-xl font-bold tracking-tighter">Saarthi</span>
                </Link>
                <div className="w-10"></div>
            </header>

            <main>
                <Card className="shadow-2xl shadow-primary/10">
                <CardHeader>
                    <CardTitle className="text-2xl">Mental Wellness Check-in</CardTitle>
                    <CardDescription>
                    Over the last 2 weeks, how often have you been bothered by any of the following problems?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full mb-6">
                        <Progress value={progress} className="w-full" />
                        <p className="text-right text-sm text-muted-foreground mt-1">{Math.round(progress)}% complete</p>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                        <div key={currentQuestion.id} className="space-y-4">
                        <Label className="text-base">{currentQuestionIndex + 1}. {currentQuestion.text}</Label>
                        <RadioGroup onValueChange={(value) => handleValueChange(currentQuestion.id, value)} value={answers[currentQuestion.id]} className="space-y-2">
                            {options.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} />
                                <Label htmlFor={`${currentQuestion.id}-${option.value}`}>{option.label}</Label>
                            </div>
                            ))}
                        </RadioGroup>
                        </div>
                    
                        {currentQuestionIndex < questions.length - 1 ? (
                            <Button onClick={handleNext} className="w-full" size="lg" disabled={!answers[currentQuestion.id]}>
                                Next
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit} className="w-full" size="lg" disabled={!answers[currentQuestion.id]}>
                                See My Results
                            </Button>
                        )}
                    </form>
                </CardContent>
                </Card>
            </main>
        </div>
    </div>
  );
}
