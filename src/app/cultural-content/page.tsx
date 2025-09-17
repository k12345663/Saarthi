'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const dailyQuote = {
  quote: "The best way to find yourself is to lose yourself in the service of others.",
  author: "Mahatma Gandhi"
};

const courses = [
  {
    id: 1,
    title: "Introduction to Yoga & Mindfulness",
    description: "Learn foundational yoga postures and mindfulness techniques to reduce stress and improve well-being.",
    image: "https://picsum.photos/seed/course1/600/400",
    dataAiHint: "yoga meditation"
  },
  {
    id: 2,
    title: "The Art of Indian Storytelling",
    description: "Explore the rich traditions of storytelling from various regions of India.",
    image: "https://picsum.photos/seed/course2/600/400",
    dataAiHint: "ancient books"
  },
  {
    id: 3,
    title: "Basics of Carnatic Music",
    description: "An introductory course on the fundamental concepts of Carnatic music.",
    image: "https://picsum.photos/seed/course3/600/400",
    dataAiHint: "music instruments"
  },
  {
    id: 4,
    title: "Mandala Art Therapy",
    description: "Discover the therapeutic benefits of creating Mandalas as a form of art therapy.",
    image: "https://picsum.photos/seed/course4/600/400",
    dataAiHint: "mandala art"
  },
];

export default function CulturalContentPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">Cultural Content</h1>
        <p className="text-muted-foreground">Resources to connect with your roots and find peace.</p>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-8">
        {/* Daily Quote Section */}
        <section>
          <Card className="w-full max-w-2xl mx-auto shadow-md bg-accent/50">
            <CardHeader>
              <CardTitle>Quote of the Day</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-lg italic border-l-4 border-primary pl-4">
                "{dailyQuote.quote}"
              </blockquote>
              <p className="text-right mt-2 text-muted-foreground">- {dailyQuote.author}</p>
            </CardContent>
          </Card>
        </section>

        {/* Courses Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-center">Cultural Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {courses.map((course) => (
              <Card key={course.id} className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative h-40 w-full">
                    <Image 
                      src={course.image} 
                      alt={course.title} 
                      fill
                      style={{objectFit:"cover"}}
                      className="rounded-t-lg"
                      data-ai-hint={course.dataAiHint}
                    />
                </div>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Enroll Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
