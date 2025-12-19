import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection = ({ scrollToSection }: HeroSectionProps) => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <Badge className="bg-gold/20 text-gold border-gold">Аутсорсинг службы безопасности</Badge>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Комплексная защита 
              <span className="text-gold"> вашего бизнеса</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Профессиональные услуги корпоративной безопасности: от проверки контрагентов 
              до защиты информации и противодействия внутренним угрозам
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gold text-black hover:bg-gold-light" onClick={() => scrollToSection('contact')}>
                <Icon name="Calendar" className="mr-2" size={20} />
                Записаться на консультацию
              </Button>
              <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10" onClick={() => scrollToSection('about')}>
                Узнать больше
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-in-up">
            <div className="aspect-square rounded-2xl overflow-hidden border border-gold/30">
              <img 
                src="https://cdn.poehali.dev/projects/aae098ad-aabb-4714-9198-73a4d6560a62/files/d68bde62-f59d-4e2f-8908-50f4a9fe6701.jpg" 
                alt="Корпоративная безопасность"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
