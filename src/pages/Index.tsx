// src/pages/Index.tsx
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Product from '@/components/sections/Product';
import Playground from '@/components/sections/Playground';
import Demo from '@/components/sections/Demo';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Awards from '@/components/sections/Awards';
import Collections from '@/components/sections/Collections';
import Footer from '@/components/layout/Footer';

import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
          <Collections />
          <Contact />
        </div>
        <div className="flex justify-center my-6">
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded border bg-muted hover:bg-accent"
          >
            Log out
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
