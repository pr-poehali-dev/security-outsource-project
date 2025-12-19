import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: (token: string) => void;
}

const AdminLogin = ({ open, onOpenChange, onLoginSuccess }: AdminLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/705135e1-95d1-462c-acde-20e9528eb51e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          username,
          password
        })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('admin_token', data.token);
        onLoginSuccess(data.token);
        onOpenChange(false);
        toast({
          title: "Авторизация успешна",
          description: "Вы вошли в режим редактирования",
        });
      } else {
        toast({
          title: "Ошибка авторизации",
          description: "Неверный логин или пароль",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось подключиться к серверу",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setUsername('');
      setPassword('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-gold">
        <DialogHeader>
          <DialogTitle className="text-gold flex items-center gap-2">
            <Icon name="Lock" size={24} />
            Вход для администратора
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Введите учетные данные для доступа к режиму редактирования
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium text-gold mb-2 block">Логин</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              className="bg-secondary border-border focus:border-gold"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gold mb-2 block">Пароль</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-secondary border-border focus:border-gold"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gold text-black hover:bg-gold-light"
            disabled={loading}
          >
            {loading ? (
              <>
                <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                Вход...
              </>
            ) : (
              <>
                <Icon name="LogIn" className="mr-2" size={20} />
                Войти
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;
