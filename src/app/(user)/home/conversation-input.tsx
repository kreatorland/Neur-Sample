import { useEffect, useRef } from 'react';

import { ForwardIcon, SendHorizontal } from 'lucide-react';
import { toast } from 'sonner';

import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ConversationInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => Promise<void>;
}

const MAX_CHARS = 2000;

export function ConversationInput({
  value,
  onChange,
  onSubmit,
}: ConversationInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!value.trim()) return;
    await onSubmit(value);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_CHARS) {
      onChange(newValue);
      return;
    }
    toast.error('Maximum character limit reached');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return (
    <div className="relative duration-500 animate-in fade-in slide-in-from-bottom-4">
      <div
        className="relative rounded-xl bg-muted"
        style={{
          border: '1px solid #adad39',
        }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            maxLength={MAX_CHARS}
            placeholder="Crypto confusing? Let's talk..."
            className="min-h-[110px] w-full resize-none overflow-hidden border-0 border-[#ffff] bg-transparent px-4 py-3 text-base focus-visible:ring-0"
          />

          <div className="flex items-center justify-between border-t px-4 py-2">
            <span className="text-xs text-muted-foreground">
              {value.length}/{MAX_CHARS}
            </span>

            <Button
              type="submit"
              size="icon"
              variant="ghost"
              disabled={!value.trim()}
              className="group relative flex h-8 w-8 items-center
                justify-center rounded-lg 
                transition-all 
                duration-200 ease-in-out
                hover:bg-primary hover:text-primary-foreground active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="rounded-lg bg-[#111111] p-2">
                <ForwardIcon
                  className="color-[#adad39] h-6 w-6 transition-transform 
                  duration-200 ease-out group-hover:scale-110"
                />
              </div>
            </Button>
          </div>
        </form>

        {/* <BorderBeam size={250} duration={8} delay={9} /> */}
      </div>
    </div>
  );
}
