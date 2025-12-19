import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface ContentBlock {
  id: number;
  section: string;
  type: string;
  content: string;
  image_url: string;
  position: number;
}

interface ContentBlockEditorProps {
  section: string;
  token: string;
  onUpdate: () => void;
}

const ContentBlockEditor = ({ section, token, onUpdate }: ContentBlockEditorProps) => {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBlock, setNewBlock] = useState({ type: 'text', content: '', image_url: '' });
  const { toast } = useToast();

  const fetchBlocks = async () => {
    try {
      const response = await fetch(
        `https://functions.poehali.dev/a81ff4d9-0486-47d8-adb8-6cbb33b71396?section=${section}`
      );
      const data = await response.json();
      setBlocks(data.blocks || []);
    } catch (error) {
      console.error('Error fetching blocks:', error);
    }
  };

  const addBlock = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/a81ff4d9-0486-47d8-adb8-6cbb33b71396', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        },
        body: JSON.stringify({
          section,
          type: newBlock.type,
          content: newBlock.content,
          image_url: newBlock.image_url,
          position: blocks.length
        })
      });

      if (response.ok) {
        toast({
          title: "Блок добавлен",
          description: "Контент успешно добавлен на страницу"
        });
        setNewBlock({ type: 'text', content: '', image_url: '' });
        setShowAddForm(false);
        await fetchBlocks();
        onUpdate();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить блок",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteBlock = async (blockId: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://functions.poehali.dev/a81ff4d9-0486-47d8-adb8-6cbb33b71396?id=${blockId}`,
        {
          method: 'DELETE',
          headers: {
            'X-Auth-Token': token
          }
        }
      );

      if (response.ok) {
        toast({
          title: "Блок удален",
          description: "Контент успешно удален"
        });
        await fetchBlocks();
        onUpdate();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить блок",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBlock = async (blockId: number, updates: Partial<ContentBlock>) => {
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/a81ff4d9-0486-47d8-adb8-6cbb33b71396', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': token
        },
        body: JSON.stringify({
          id: blockId,
          ...updates
        })
      });

      if (response.ok) {
        toast({
          title: "Блок обновлен",
          description: "Изменения сохранены"
        });
        await fetchBlocks();
        onUpdate();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить блок",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    fetchBlocks();
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-gold font-semibold">
          Редактирование секции: {section}
        </h3>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gold text-black hover:bg-gold-light"
          size="sm"
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить блок
        </Button>
      </div>

      {showAddForm && (
        <Card className="bg-card border-gold">
          <CardContent className="p-4 space-y-3">
            <div>
              <label className="text-sm text-gold">Тип блока</label>
              <select
                value={newBlock.type}
                onChange={(e) => setNewBlock({ ...newBlock, type: e.target.value })}
                className="w-full mt-1 bg-secondary border border-border rounded-md p-2 text-foreground"
              >
                <option value="text">Текст</option>
                <option value="image">Изображение</option>
              </select>
            </div>

            {newBlock.type === 'text' && (
              <div>
                <label className="text-sm text-gold">Текст</label>
                <Textarea
                  value={newBlock.content}
                  onChange={(e) => setNewBlock({ ...newBlock, content: e.target.value })}
                  placeholder="Введите текст..."
                  className="bg-secondary border-border"
                  rows={4}
                />
              </div>
            )}

            {newBlock.type === 'image' && (
              <div>
                <label className="text-sm text-gold">URL изображения</label>
                <Input
                  value={newBlock.image_url}
                  onChange={(e) => setNewBlock({ ...newBlock, image_url: e.target.value })}
                  placeholder="https://..."
                  className="bg-secondary border-border"
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={addBlock}
                disabled={loading}
                className="bg-gold text-black hover:bg-gold-light"
              >
                Сохранить
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="border-gold text-gold"
              >
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {blocks.map((block) => (
          <Card key={block.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <span className="text-xs text-gold">
                    {block.type === 'text' ? 'Текст' : 'Изображение'}
                  </span>
                  {block.type === 'text' && (
                    <p className="text-sm text-muted-foreground mt-1">{block.content}</p>
                  )}
                  {block.type === 'image' && (
                    <img src={block.image_url} alt="" className="w-32 h-20 object-cover rounded mt-1" />
                  )}
                </div>
                <Button
                  onClick={() => deleteBlock(block.id)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentBlockEditor;
