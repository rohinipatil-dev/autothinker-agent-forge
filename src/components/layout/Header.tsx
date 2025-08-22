
import { Bot } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Product', href: '#product' },
  { name: 'Playground', href: '#playground' },
  { name: 'Demo', href: '#demo' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
  { name: 'Award', href: '#award' },
  { name: 'Collections', href: '#Collections' },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <a href="#home" className="flex items-center font-bold mr-6">
          <Bot className="h-6 w-6 mr-2" />
          AutoThinker
        </a>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
