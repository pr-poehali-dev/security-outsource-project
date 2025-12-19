import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
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

  const services = [
    {
      category: "Проверка и аудит",
      icon: "Search",
      items: [
        "Комплексная проверка контрагентов",
        "Анализ благонадежности и финансовой документации",
        "Проверка кандидатов при приеме на работу",
        "Финансовый аудит предприятия"
      ]
    },
    {
      category: "Информационная безопасность",
      icon: "Shield",
      items: [
        "Защита коммерческой тайны",
        "DLP, SIEM, Антивирусные комплексы",
        "Контроль утечек информации",
        "Разработка политики безопасности"
      ]
    },
    {
      category: "Противодействие угрозам",
      icon: "AlertTriangle",
      items: [
        "Выявление промышленного шпионажа",
        "Антикоррупционная политика",
        "Предупреждение хищений и злоупотреблений",
        "Служебные проверки и ревизии"
      ]
    }
  ];

  const cases = [
    {
      title: "Крупная производственная компания",
      description: "Выявлены факты завышения стоимости закупок на 18% и предотвращены хищения на сумму 12 млн ₽",
      result: "Экономия 12 млн ₽",
      icon: "Factory"
    },
    {
      title: "Строительный холдинг",
      description: "Проведен аудит подрядных организаций, выявлено несоответствие объемов работ на 25%",
      result: "Возврат 8.5 млн ₽",
      icon: "Building2"
    },
    {
      title: "IT-компания",
      description: "Внедрена система DLP и пресечена утечка коммерческой информации к конкурентам",
      result: "Защита данных",
      icon: "Code2"
    }
  ];

  const blogPosts = [
    {
      title: "5 признаков ненадежного контрагента",
      date: "15 декабря 2024",
      category: "Проверки"
    },
    {
      title: "Как защитить коммерческую тайну в эпоху удаленной работы",
      date: "10 декабря 2024",
      category: "Безопасность"
    },
    {
      title: "Антикоррупционные стандарты для малого бизнеса",
      date: "5 декабря 2024",
      category: "Комплаенс"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon name="Shield" className="text-gold" size={32} />
            <span className="text-xl font-bold text-gold">SecureGuard</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#about" className="text-muted-foreground hover:text-gold transition-colors">О компании</a>
            <a href="#services" className="text-muted-foreground hover:text-gold transition-colors">Услуги</a>
            <a href="#cases" className="text-muted-foreground hover:text-gold transition-colors">Кейсы</a>
            <a href="#blog" className="text-muted-foreground hover:text-gold transition-colors">Блог</a>
            <a href="#contact" className="text-muted-foreground hover:text-gold transition-colors">Контакты</a>
          </div>
          <Button className="bg-gold text-black hover:bg-gold-light">
            Консультация
          </Button>
        </div>
      </nav>

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
              <div className="flex gap-4">
                <Button size="lg" className="bg-gold text-black hover:bg-gold-light">
                  <Icon name="Calendar" className="mr-2" size={20} />
                  Записаться на консультацию
                </Button>
                <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10">
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

      <section id="about" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">О <span className="text-gold">компании</span></h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Мы предоставляем полный спектр услуг корпоративной безопасности для защиты 
              интересов вашего бизнеса от внешних и внутренних угроз
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card border-border hover:border-gold transition-all duration-300 animate-scale-in">
              <CardHeader>
                <Icon name="Award" className="text-gold mb-4" size={48} />
                <CardTitle className="text-gold">15+ лет опыта</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Профессиональная команда экспертов с опытом работы в силовых структурах
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border hover:border-gold transition-all duration-300 animate-scale-in">
              <CardHeader>
                <Icon name="Users" className="text-gold mb-4" size={48} />
                <CardTitle className="text-gold">300+ клиентов</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Доверие крупных компаний и холдингов по всей России
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border hover:border-gold transition-all duration-300 animate-scale-in">
              <CardHeader>
                <Icon name="CheckCircle" className="text-gold mb-4" size={48} />
                <CardTitle className="text-gold">98% успеха</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Высокий процент успешно решенных задач по защите бизнеса
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4"><span className="text-gold">Услуги</span></h2>
            <p className="text-xl text-muted-foreground">
              Комплексное решение задач безопасности вашего предприятия
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="bg-card border-border hover:border-gold transition-all duration-300 group animate-fade-in-up">
                <CardHeader>
                  <Icon name={service.icon as any} className="text-gold mb-4 group-hover:scale-110 transition-transform" size={56} />
                  <CardTitle className="text-2xl text-gold">{service.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <Icon name="ChevronRight" className="text-gold mt-1 flex-shrink-0" size={20} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Портфолио и <span className="text-gold">Кейсы</span></h2>
            <p className="text-xl text-muted-foreground">
              Реальные результаты нашей работы
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {cases.map((caseItem, idx) => (
              <Card key={idx} className="bg-card border-border hover:border-gold transition-all duration-300 animate-scale-in">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mb-4">
                    <Icon name={caseItem.icon as any} className="text-gold" size={32} />
                  </div>
                  <CardTitle className="text-xl">{caseItem.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {caseItem.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-gold text-black">{caseItem.result}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4"><span className="text-gold">Блог</span></h2>
            <p className="text-xl text-muted-foreground">
              Экспертные материалы о безопасности бизнеса
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, idx) => (
              <Card key={idx} className="bg-card border-border hover:border-gold transition-all duration-300 cursor-pointer group animate-fade-in-up">
                <CardHeader>
                  <Badge className="bg-gold/20 text-gold border-gold mb-2 w-fit">{post.category}</Badge>
                  <CardTitle className="text-xl group-hover:text-gold transition-colors">{post.title}</CardTitle>
                  <CardDescription className="text-muted-foreground flex items-center gap-2">
                    <Icon name="Calendar" size={16} />
                    {post.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="text-gold hover:text-gold-light p-0">
                    Читать далее <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 SecureGuard. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;