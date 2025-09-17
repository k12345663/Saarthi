import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
            <CardDescription>Last updated: October 26, 2023</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <p>
              Please read these Terms of Service carefully before using the Saarthi platform. Your access to and use of the service is conditioned on your acceptance of and compliance with these Terms.
            </p>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">1. Not a Replacement for Medical Advice</h2>
              <p>
                Saarthi is a supportive tool but is not a substitute for professional medical advice, diagnosis, or treatment. It is not intended to be used for crisis situations. If you are in crisis, please contact a helpline or emergency services immediately.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">2. User Conduct</h2>
              <p>
                You agree not to use the platform to post any content that is abusive, threatening, obscene, defamatory, or otherwise objectionable. The community forums are moderated, and any user found violating these guidelines may have their content removed and their access restricted.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">3. Account Responsibility</h2>
              <p>
                If you create an account, you are responsible for maintaining the security of your account and for all activities that occur under the account. You must notify us immediately of any unauthorized use of your account.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">4. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms of Service on this page. Your continued use of the service after any such changes constitutes your acceptance of the new Terms.
              </p>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">5. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at <Link href="mailto:support@saarthi.com" className="text-primary underline">support@saarthi.com</Link>.
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
