
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="container text-center py-12 md:py-24">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
      <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-4">
        Have a question or want to partner with us? We'd love to hear from you.
      </p>
      <div className="mt-6">
        <a href="mailto:contact@autothinker.ai">
          <Button size="lg">
            <Mail className="mr-2 h-5 w-5" />
            contact@autothinker.ai
          </Button>
        </a>
      </div>
    </section>
  );
};

export default Contact;
