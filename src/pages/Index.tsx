import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import AdminLogin from '@/components/AdminLogin';
import ContentBlockEditor from '@/components/ContentBlockEditor';
import Navigation from '@/components/sections/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import MainSections from '@/components/sections/MainSections';
import ContactFooter from '@/components/sections/ContactFooter';

const Index = () => {
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [adminToken, setAdminToken] = useState<string>('');
  const [editPanelOpen, setEditPanelOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [contentBlocks, setContentBlocks] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      verifyToken(token);
    }
    fetchContentBlocks();
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/705135e1-95d1-462c-acde-20e9528eb51e', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', token })
      });
      const data = await response.json();
      if (data.valid) {
        setAdminToken(token);
        setEditMode(true);
      } else {
        localStorage.removeItem('admin_token');
      }
    } catch (error) {
      console.error('Token verification failed', error);
    }
  };

  const fetchContentBlocks = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/a81ff4d9-0486-47d8-adb8-6cbb33b71396');
      const data = await response.json();
      setContentBlocks(data.blocks || []);
    } catch (error) {
      console.error('Error fetching content blocks:', error);
    }
  };

  const handleLoginSuccess = (token: string) => {
    setAdminToken(token);
    setEditMode(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setAdminToken('');
    setEditMode(false);
    setEditPanelOpen(false);
    toast({
      title: "Выход выполнен",
      description: "Режим редактирования отключен"
    });
  };

  const openEditPanel = (section: string) => {
    setCurrentSection(section);
    setEditPanelOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <MainSections />
      <ContactFooter 
        editMode={editMode}
        onAdminLoginOpen={() => setAdminLoginOpen(true)}
        onEditPanelOpen={openEditPanel}
        onLogout={handleLogout}
      />

      <AdminLogin 
        open={adminLoginOpen} 
        onOpenChange={setAdminLoginOpen}
        onLoginSuccess={handleLoginSuccess}
      />

      <Sheet open={editPanelOpen} onOpenChange={setEditPanelOpen}>
        <SheetContent className="bg-background border-gold overflow-y-auto w-full sm:max-w-xl">
          <SheetHeader>
            <SheetTitle className="text-gold">Редактирование контента</SheetTitle>
            <SheetDescription className="text-muted-foreground">
              Добавляйте или удаляйте текстовые блоки и изображения
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <ContentBlockEditor 
              section={currentSection}
              token={adminToken}
              onUpdate={fetchContentBlocks}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
