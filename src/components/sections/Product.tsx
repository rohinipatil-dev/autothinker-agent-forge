
import { Bot, Wand2, Link, Workflow } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const features = [
  {
    icon: <Workflow className="h-8 w-8 text-primary" />,
    title: '1. Describe Your Agent',
    description: 'Simply write a prompt detailing what you want your AI agent to do, its personality, and its goals.',
  },
  {
    icon: <Wand2 className="h-8 w-8 text-primary" />,
    title: '2. AutoThinker Builds & Deploys',
    description: 'Our platform intelligently interprets your prompt, writes the necessary code, and deploys it to the cloud.',
  },
  {
    icon: <Link className="h-8 w-8 text-primary" />,
    title: '3. Get Your Agent Link',
    description: "Receive a unique link to your fully functional AI agent, ready to use and share immediately.",
  },
];

const Product = () => {
  return (
    <section id="product" className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl mt-4">
          A simple, three-step process to bring your AI ideas to life.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={feature.title} className="bg-secondary/50 border-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
            <CardHeader>
              <div className="mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription className="pt-2">{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Product;
