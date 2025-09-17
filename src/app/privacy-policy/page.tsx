import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <CardDescription>Last updated: October 26, 2023</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <p>
              Welcome to Saarthi. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information.
            </p>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
              <p>
                We may collect information from you in several ways, including when you sign up, take an assessment, or interact with our chatbot. This may include your college ID (if provided), assessment scores, and conversation history. For anonymous users, we do not store any personally identifiable information.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
              <p>
                The information we collect is used to provide and improve our services. For signed-in users, data is used to show your dashboard, track progress, and offer personalized recommendations. Aggregated and anonymized data may be used for research and to improve the overall mental wellness services at your institution.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">3. Data Security</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. All data is encrypted and stored securely. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">4. Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information at any time through your account settings. If you are using the platform anonymously, no data is stored that would require deletion.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at <Link href="mailto:support@saarthi.com" className="text-primary underline">support@saarthi.com</Link>.
              </p>
            </div>
             <div className="pt-6 text-center">
                <Link href="/" className="text-primary hover:underline">
                    Return to Homepage
                </Link>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
