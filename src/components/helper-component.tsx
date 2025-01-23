import Image from 'next/image';

import { motion } from 'framer-motion';
import {
  BotIcon,
  BrainCircuitIcon,
  BrainIcon,
  Cable,
  ChartNetwork,
  Globe,
  WorkflowIcon,
  XIcon,
  ZapIcon,
} from 'lucide-react';

import { Circle } from './ui/circle';

export function HelperComponent() {
  return (
    <div className="mt-20">
      <div className="flex flex-col sm:flex-row">
        <div className="h-[180px] w-full border-b-0 border-r-0 p-0   sm:w-[420px] sm:border-b-2 sm:border-r-2 sm:p-2.5 sm:px-3">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 * 0.1 }}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 0.99,
              transition: { duration: 0.1 },
            }}
            className="group relative flex h-[160px] w-full flex-col items-start gap-3 overflow-hidden rounded-xl bg-muted 
  p-4 transition-all duration-200"
          >
            <motion.div
              initial={false}
              whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              className="relative z-10 flex shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg"
              // style={{
              //   background: `linear-gradient(135deg, ${item.theme.primary}15, ${item.theme.secondary}10)`,
              // }}
            >
              <Circle>
                <BrainCircuitIcon></BrainCircuitIcon>
              </Circle>
            </motion.div>

            <div className="z-10 flex-1 space-y-0.5 text-left">
              <motion.div
                className="text-sm font-medium transition-colors duration-300"
                initial={false}
              >
                Natural Language Transactions
              </motion.div>
              {/* {item.description && ( */}
              <motion.div
                className="line-clamp-3 text-xs text-muted-foreground/70"
                initial={false}
              >
                Users can send tokens, stake, or swap assets by simply typing
                commands like Stake 10 $SOL for 30 days.
              </motion.div>
              {/* )} */}
            </div>

            {/* Theme color overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              // style={{
              //   background: `linear-gradient(135deg, ${item.theme.primary}10, ${item.theme.secondary}05)`,
              // }}
            />
          </motion.button>
        </div>
        <div className="h-[180px] w-full border-b-0 border-r-0 p-0 sm:w-[420px] sm:border-b-2 sm:border-r-2 sm:p-2.5 sm:px-3">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 * 0.1 }}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 0.99,
              transition: { duration: 0.1 },
            }}
            className="group relative flex h-[160px] w-full flex-col items-start gap-3 overflow-hidden rounded-xl bg-muted 
  p-4 transition-all duration-200"
          >
            <motion.div
              initial={false}
              whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              className="relative z-10 flex shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg"
              // style={{
              //   background: `linear-gradient(135deg, ${item.theme.primary}15, ${item.theme.secondary}10)`,
              // }}
            >
              <Circle>
                <BotIcon></BotIcon>
              </Circle>
            </motion.div>

            <div className="z-10 flex-1 space-y-0.5 text-left">
              <motion.div
                className="text-sm font-medium transition-colors duration-300"
                initial={false}
              >
                On-Chain Automation
              </motion.div>
              {/* {item.description && ( */}
              <motion.div
                className="line-clamp-3 text-xs text-muted-foreground/70"
                initial={false}
              >
                Numble simplifies complex tasks on Solana by automating smart
                contract interactions, making blockchain processes seamless.
              </motion.div>
              {/* )} */}
            </div>

            {/* Theme color overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              // style={{
              //   background: `linear-gradient(135deg, ${item.theme.primary}10, ${item.theme.secondary}05)`,
              // }}
            />
          </motion.button>
        </div>
        <div className="h-[180px] w-full border-b-0  p-0 sm:w-[420px] sm:border-b-2 sm:p-2.5 sm:px-3">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 * 0.1 }}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 0.99,
              transition: { duration: 0.1 },
            }}
            className="group relative flex h-[160px] w-full flex-col items-start gap-3 overflow-hidden rounded-xl bg-muted 
  p-4 transition-all duration-200"
          >
            <motion.div
              initial={false}
              whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              className="relative z-10 flex shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg"
              // style={{
              //   background: `linear-gradient(135deg, ${item.theme.primary}15, ${item.theme.secondary}10)`,
              // }}
            >
              {/* <Image
    src={item.icon}
    alt={item.label}
    width={24}
    height={24}
    className="z-10 transition-transform duration-300 group-hover:scale-105"
  /> */}

              <Circle>
                <WorkflowIcon></WorkflowIcon>
              </Circle>
            </motion.div>

            <div className="z-10 flex-1 space-y-0.5 text-left">
              <motion.div
                className="text-sm font-medium transition-colors duration-300"
                initial={false}
              >
                DeFi Optimization
              </motion.div>
              {/* {item.description && ( */}
              <motion.div
                className="line-clamp-3 text-xs text-muted-foreground/70"
                initial={false}
              >
                Boost yield farming and liquidity management by executing
                real-time strategies with precision.
              </motion.div>
              {/* )} */}
            </div>

            {/* Theme color overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              // style={{
              //   background: `linear-gradient(135deg, ${item.theme.primary}10, ${item.theme.secondary}05)`,
              // }}
            />
          </motion.button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="h-[180px] w-full border-r-0  p-0 sm:w-[420px] sm:border-r-2 sm:p-2.5 sm:px-3">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 * 0.1 }}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 0.99,
              transition: { duration: 0.1 },
            }}
            className="group relative flex h-[160px] w-full flex-col items-start gap-3 overflow-hidden rounded-xl bg-muted 
  p-4 transition-all duration-200"
          >
            <motion.div
              initial={false}
              whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              className="relative z-10 flex shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg"
              // style={{
              //   background: `linear-gradient(135deg, ${item.theme.primary}15, ${item.theme.secondary}10)`,
              // }}
            >
              {/* <Image
    src={item.icon}
    alt={item.label}
    width={24}
    height={24}
    className="z-10 transition-transform duration-300 group-hover:scale-105"
  /> */}

              <Circle>
                <Cable></Cable>
              </Circle>
            </motion.div>

            <div className="z-10 flex-1 space-y-0.5 text-left">
              <motion.div
                className="text-sm font-medium transition-colors duration-300"
                initial={false}
              >
                Adoption Catalyst
              </motion.div>
              {/* {item.description && ( */}
              <motion.div
                className="line-clamp-3 text-xs text-muted-foreground/70"
                initial={false}
              >
                Drive mass adoption by simplifying blockchain interactions,
                making crypto accessible for non-technical users.
                ksflksdfjlskdfjs
              </motion.div>
              {/* )} */}
            </div>

            {/* Theme color overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              // style={{
              //   background: `linear-gradient(135deg, ${item.theme.primary}10, ${item.theme.secondary}05)`,
              // }}
            />
          </motion.button>
        </div>
        <div className="h-[180px]  w-full border-r-0 p-0 sm:w-[420px] sm:border-r-2 sm:p-2.5 sm:px-3">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 * 0.1 }}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 0.99,
              transition: { duration: 0.1 },
            }}
            className="group relative flex h-[160px] w-full flex-col items-start gap-3 overflow-hidden rounded-xl bg-muted 
  p-4 transition-all duration-200"
          >
            <motion.div
              initial={false}
              whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              className="relative z-10 flex shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg"
              // style={{
              //   background: `linear-gradient(135deg, ${item.theme.primary}15, ${item.theme.secondary}10)`,
              // }}
            >
              {/* <Image
    src={item.icon}
    alt={item.label}
    width={24}
    height={24}
    className="z-10 transition-transform duration-300 group-hover:scale-105"
  /> */}

              <Circle>
                <ChartNetwork></ChartNetwork>
              </Circle>
            </motion.div>

            <div className="z-10 flex-1 space-y-0.5 text-left ">
              <motion.div
                className="text-sm font-medium transition-colors duration-300"
                initial={false}
              >
                Market Analytics
              </motion.div>
              {/* {item.description && ( */}
              <motion.div
                className="line-clamp-3 text-xs text-muted-foreground/70"
                initial={false}
              >
                Provides insights into market trends, token performance, and
                user behavior with real-time and historical data visualization.
              </motion.div>
              {/* )} */}
            </div>

            {/* Theme color overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              // style={{
              //   background: `linear-gradient(135deg, ${item.theme.primary}10, ${item.theme.secondary}05)`,
              // }}
            />
          </motion.button>
        </div>
        <div className="h-[180px] w-full p-0 sm:w-[420px] sm:p-2.5 sm:px-3">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 * 0.1 }}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 0.99,
              transition: { duration: 0.1 },
            }}
            className="group relative flex h-[160px] w-full flex-col items-start gap-3 overflow-hidden rounded-xl bg-muted 
  p-4 transition-all duration-200"
          >
            <motion.div
              initial={false}
              whileHover={{
                scale: 1.05,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              className="relative z-10 flex shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg"
              // style={{
              //   background: `linear-gradient(135deg, ${item.theme.primary}15, ${item.theme.secondary}10)`,
              // }}
            >
              {/* <Image
    src={item.icon}
    alt={item.label}
    width={24}
    height={24}
    className="z-10 transition-transform duration-300 group-hover:scale-105"
  /> */}

              <Circle>
                <Globe></Globe>
              </Circle>
            </motion.div>

            <div className="z-10 flex-1 space-y-0.5 text-left">
              <motion.div
                className="text-sm font-medium transition-colors duration-300"
                initial={false}
              >
                Web2-Like UX
              </motion.div>
              {/* {item.description && ( */}
              <motion.div
                className="line-clamp-3 text-xs text-muted-foreground/70"
                initial={false}
              >
                Offers a user-friendly interface with dashboards, one-click
                actions, and mobile optimization, ensuring familiarity for
                mainstream users.
              </motion.div>
              {/* )} */}
            </div>

            {/* Theme color overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              // style={{
              //   background: `linear-gradient(135deg, ${item.theme.primary}10, ${item.theme.secondary}05)`,
              // }}
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
