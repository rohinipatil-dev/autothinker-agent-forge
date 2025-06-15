
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Product from '@/components/sections/Product';
import Playground from '@/components/sections/Playground';
import Demo from '@/components/sections/Demo';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Awards from '@/components/sections/Awards';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="space-y-12 md:space-y-24">
          <Product />
          <Playground />
          <Demo />
          <About />
          <Awards />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
