import { motion } from 'framer-motion';

import type { Suggestion } from './data/suggestions';

interface SuggestionCardProps extends Suggestion {
  delay?: number;
  onSelect: (text: string) => void;
}

export function SuggestionCard({
  title,
  icon,
  subtitle,
  delay = 0,
  onSelect,
}: SuggestionCardProps) {
  const Icon = icon;
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(title)}
      className="gap-1.2 py-2.2 flex flex-col items-center justify-center rounded-xl 
        bg-muted/50  px-1 text-left transition-colors duration-200 hover:bg-primary/5"
    >
      <div className="flex items-center space-x-2 py-2 text-center text-[12px] font-medium">
        <Icon
          className={`color-${getRandomColor()}`}
          style={{
            height: '15px',
            width: '15px',
            color: `${getRandomColor()}`,
          }}
        ></Icon>
        <p>{title}</p>
      </div>
      {/* <div className="text-xs text-muted-foreground/80">{subtitle}</div> */}
    </motion.button>
  );
}
