import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface ContactFooterProps {
  editMode: boolean;
  onAdminLoginOpen: () => void;
  onEditPanelOpen: (section: string) => void;
  onLogout: () => void;
}

const ContactFooter = ({ editMode, onAdminLoginOpen, onEditPanelOpen, onLogout }: ContactFooterProps) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Наш эксперт свяжется с вами в ближайшее время.",
    });
    setFormData({ name: '', company: '', phone: '', email: '', message: '' });
  };

  return (
    <>
      <section id="contact" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Бесплатная <span className="text-gold">консультация</span></h2>
            <p className="text-xl text-muted-foreground">
              Оставьте заявку, и наш эксперт свяжется с вами для обсуждения задач безопасности
            </p>
          </div>
          <Card className="bg-card border-gold animate-scale-in">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gold mb-2 block">Ваше имя *</label>
                    <Input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Иван Иванов"
                      className="bg-secondary border-border focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gold mb-2 block">Компания</label>
                    <Input 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="ООО «Ваша компания»"
                      className="bg-secondary border-border focus:border-gold"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gold mb-2 block">Телефон *</label>
                    <Input 
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+7 (999) 123-45-67"
                      className="bg-secondary border-border focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gold mb-2 block">Email *</label>
                    <Input 
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="email@company.ru"
                      className="bg-secondary border-border focus:border-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gold mb-2 block">Опишите вашу задачу</label>
                  <Textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Расскажите, какие вопросы безопасности вас интересуют..."
                    rows={5}
                    className="bg-secondary border-border focus:border-gold"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-gold text-black hover:bg-gold-light">
                  <Icon name="Send" className="mr-2" size={20} />
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Shield" className="text-gold" size={32} />
                <span className="text-xl font-bold text-gold">SecureGuard</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Профессиональная служба корпоративной безопасности
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Проверка контрагентов</li>
                <li>Финансовый аудит</li>
                <li>Защита информации</li>
                <li>Служебные проверки</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>О нас</li>
                <li>Портфолио</li>
                <li>Блог</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} className="text-gold" />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} className="text-gold" />
                  info@secureguard.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} className="text-gold" />
                  Москва, Тверская 1
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center">
            <div className="text-sm text-muted-foreground mb-2">
              © 2024 SecureGuard. Все права защищены.
            </div>
            <div className="flex justify-center gap-4 items-center">
              {editMode ? (
                <>
                  <Button
                    onClick={() => onEditPanelOpen('custom')}
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gold/60 hover:text-gold"
                  >
                    <Icon name="Edit" size={14} className="mr-1" />
                    Редактировать контент
                  </Button>
                  <Button
                    onClick={onLogout}
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gold/60 hover:text-gold"
                  >
                    <Icon name="LogOut" size={14} className="mr-1" />
                    Выйти
                  </Button>
                </>
              ) : (
                <button
                  onClick={onAdminLoginOpen}
                  className="text-xs text-muted-foreground/40 hover:text-gold/60 transition-colors"
                >
                  Редактировать
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactFooter;
