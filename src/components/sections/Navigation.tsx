import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  scrollToSection: (sectionId: string) => void;
}

const Navigation = ({ scrollToSection }: NavigationProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (section: string) => {
    scrollToSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icon name="Shield" className="text-gold" size={32} />
          <span className="text-xl font-bold text-gold">Защита бизнеса</span>
        </div>
        <div className="hidden md:flex gap-8">
          <button onClick={() => scrollToSection('about')} className="text-muted-foreground hover:text-gold transition-colors">О компании</button>
          <button onClick={() => scrollToSection('services')} className="text-muted-foreground hover:text-gold transition-colors">Услуги</button>
          <button onClick={() => scrollToSection('cases')} className="text-muted-foreground hover:text-gold transition-colors">Кейсы</button>
          <button onClick={() => scrollToSection('blog')} className="text-muted-foreground hover:text-gold transition-colors">Блог</button>
          <button onClick={() => scrollToSection('contact')} className="text-muted-foreground hover:text-gold transition-colors">Контакты</button>
        </div>
        <div className="flex items-center gap-4">
          <Button className="hidden md:block bg-gold text-black hover:bg-gold-light" onClick={() => scrollToSection('contact')}>
            Консультация
          </Button>
          <button 
            className="md:hidden text-gold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={28} />
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <button onClick={() => handleNavClick('about')} className="text-left text-lg text-muted-foreground hover:text-gold transition-colors py-2">О компании</button>
            <button onClick={() => handleNavClick('services')} className="text-left text-lg text-muted-foreground hover:text-gold transition-colors py-2">Услуги</button>
            <button onClick={() => handleNavClick('cases')} className="text-left text-lg text-muted-foreground hover:text-gold transition-colors py-2">Кейсы</button>
            <button onClick={() => handleNavClick('blog')} className="text-left text-lg text-muted-foreground hover:text-gold transition-colors py-2">Блог</button>
            <button onClick={() => handleNavClick('contact')} className="text-left text-lg text-muted-foreground hover:text-gold transition-colors py-2">Контакты</button>
            <Button className="w-full bg-gold text-black hover:bg-gold-light mt-4" onClick={() => handleNavClick('contact')}>
              Консультация
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
