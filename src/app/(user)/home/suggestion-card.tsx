import { motion } from 'framer-motion';

import type { Suggestion } from './data/suggestions';

interface SuggestionCardProps extends Suggestion {
  /** @default 0 */
  delay?: number;
  /** @default false */
  useSubtitle?: boolean;
  onSelect: (text: string) => void;
}

export function SuggestionCard({
  title,
  icon,
  subtitle,
  delay = 0,
  useSubtitle = false,
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
      onClick={() => onSelect(useSubtitle ? subtitle : title)}
      className="gap-1.2 py-2.2 flex h-[80px] flex-col items-center justify-center 
      rounded-xl  bg-primary/5 px-1 text-left transition-colors duration-200 hover:bg-primary/5"
    >
      <div className="flex flex-col items-center gap-2 space-x-3 py-2 text-center text-[12px] font-medium">
        <Icon
          className={`color-${getRandomColor()}`}
          style={{
            height: '22px',
            width: '22px',
            color: `#1bea2c`,
          }}
        ></Icon>
        <p style={{ margin: '0px' }}>{title}</p>
      </div>
    </motion.button>
  );
}
