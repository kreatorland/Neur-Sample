import { useEffect, useRef } from 'react';

import { ForwardIcon, ImageIcon, Mic, SendHorizontal } from 'lucide-react';
import { toast } from 'sonner';

import { NLogo } from '@/components/n-logo';
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
        className="relative rounded-xl bg-[#fff] px-1"
        style={{
          border: '1px solid #fff',
        }}
      >
        <form onSubmit={handleSubmit} className="flex items-center">
          <NLogo></NLogo>
          {/* min-h-[40px] */}
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            maxLength={MAX_CHARS}
            placeholder="Type your prompt here..."
            className=" w-full resize-none overflow-hidden border-0 bg-transparent p-[14px] pt-[22px] text-black focus-visible:ring-0"
          />

          <div className="flex items-center justify-center gap-2">
            <ImageIcon color="black"></ImageIcon>
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              disabled={!value.trim()}
              className="group relative flex h-8 w-8 items-center
              justify-center 
                rounded-lg 
                bg-[#1bea2c] 
                transition-all 
                duration-200 ease-in-out
                active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ForwardIcon
                color="white"
                className="color-[#adad39] h-6 w-6 transition-transform 
                  duration-200 ease-out group-hover:scale-110"
              />
            </Button>
          </div>

          {/* <div className="flex items-center justify-between border-t px-4 py-2">
            <span className="text-xs text-muted-foreground">
              {value.length}/{MAX_CHARS}
            </span>

           
          </div> */}
        </form>
      </div>
    </div>
  );
}
