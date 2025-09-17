'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';

const posts = [
  {
    id: 1,
    author: 'StudentA',
    avatar: 'https://github.com/shadcn.png',
    content: "Feeling really overwhelmed with exam stress. Any tips on how to manage it? It's been tough to focus.",
    likes: 12,
    comments: 5,
  },
  {
    id: 2,
    author: 'StudentB',
    avatar: 'https://github.com/shadcn.png',
    content: "Just wanted to share a small win! I finally finished a project I've been procrastinating on for weeks. It feels so good to be done.",
    likes: 45,
    comments: 8,
  },
  {
    id: 3,
    author: 'StudentC',
    avatar: 'https://github.com/shadcn.png',
    content: "Homesickness is hitting me hard this week. It's my first year away from family. How do you all cope with it?",
    likes: 23,
    comments: 12,
  },
];

export default function CommunityPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">Community Forum</h1>
        <p className="text-muted-foreground">A safe space to share and connect with peers.</p>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="w-full max-w-2xl mx-auto shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                    <AvatarImage src={post.avatar} alt={`@${post.author}`} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg font-semibold">{post.author}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground">{post.content}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-start gap-4 text-muted-foreground">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>{post.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments}</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  );
}
