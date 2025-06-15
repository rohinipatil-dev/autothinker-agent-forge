
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="container flex flex-col items-center justify-center text-center py-24 sm:py-32 md:py-48">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up">
        Build, Deploy, and Launch AI Agents. Instantly.
      </h1>
      <p className="mx-auto max-w-[700px] text-lg text-muted-foreground mt-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        AutoThinker empowers you to create custom AI agents from a simple prompt. No code required.
      </p>
      <div className="mt-6 flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <a href="#playground">
          <Button>Try the Playground</Button>
        </a>
        <a href="#demo">
          <Button variant="outline">Request a Demo</Button>
        </a>
      </div>
    </section>
  );
};

export default Hero;
