
import { Bot } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-6">
      <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <a href="#home" className="flex items-center font-bold text-sm">
          <Bot className="h-5 w-5 mr-2" />
          AutoThinker
        </a>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} AutoThinker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
