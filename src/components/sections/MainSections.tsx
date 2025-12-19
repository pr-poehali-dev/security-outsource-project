import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const MainSections = () => {
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
    <>
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
    </>
  );
};

export default MainSections;
