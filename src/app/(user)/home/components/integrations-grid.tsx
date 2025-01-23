import Image from 'next/image';

import { motion } from 'framer-motion';

import { INTEGRATIONS } from '../data/integrations';
import { IntegrationCard } from './integration-card';

export function IntegrationsGrid() {
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
              className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg"
            >
              <Image
                src={`integrations/pump_fun.svg`}
                alt="img"
                width={24}
                height={24}
                className="z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            <div className="z-10 flex-1 space-y-0.5 text-left">
              <motion.div
                className="text-sm font-medium transition-colors duration-300"
                initial={false}
              >
                pump.fun
              </motion.div>
              {/* {item.description && ( */}
              <motion.div
                className="line-clamp-3 text-xs text-muted-foreground/70"
                initial={false}
              >
                Discover new tokens, launch tokens
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
              <Image
                src={`integrations/jupiter.svg`}
                alt="jupiter"
                width={24}
                height={24}
                className="z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            <div className="z-10 flex-1 space-y-0.5 text-left">
              <motion.div
                className="text-sm font-medium transition-colors duration-300"
                initial={false}
              >
                Jupiter
              </motion.div>
              {/* {item.description && ( */}
              <motion.div
                className="line-clamp-3 text-xs text-muted-foreground/70"
                initial={false}
              >
                Swap tokens & DCA, Limit orders
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

              <Image
                src={`integrations/magic_eden.svg`}
                alt="jupiter"
                width={24}
                height={24}
                className="z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            <div className="z-10 flex-1 space-y-0.5 text-left">
              <motion.div
                className="text-sm font-medium transition-colors duration-300"
                initial={false}
              >
                Magic Eden
              </motion.div>
              {/* {item.description && ( */}
              <motion.div
                className="line-clamp-3 text-xs text-muted-foreground/70"
                initial={false}
              >
                Explore the best NFT collections
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

              <Image
                src={`integrations/dialect.svg`}
                alt="dialect"
                width={24}
                height={24}
                className="z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            <div className="z-10 flex-1 space-y-0.5 text-left">
              <motion.div
                className="text-sm font-medium transition-colors duration-300"
                initial={false}
              >
                Dialect
              </motion.div>
              {/* {item.description && ( */}
              <motion.div
                className="line-clamp-3 text-xs text-muted-foreground/70"
                initial={false}
              >
                Create and share blinks
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

              <Image
                src={`integrations/dexscreener.svg`}
                alt="dexscreener"
                width={24}
                height={24}
                className="z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            <div className="z-10 flex-1 space-y-0.5 text-left ">
              <motion.div
                className="text-sm font-medium transition-colors duration-300"
                initial={false}
              >
                DexScreener
              </motion.div>
              {/* {item.description && ( */}
              <motion.div
                className="line-clamp-3 text-xs text-muted-foreground/70"
                initial={false}
              >
                Discover trending tokens
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

              <Image
                src={`integrations/defined_fi.svg`}
                alt="defined_fi"
                width={24}
                height={24}
                className="z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>

            <div className="z-10 flex-1 space-y-0.5 text-left">
              <motion.div
                className="text-sm font-medium transition-colors duration-300"
                initial={false}
              >
                Defined Fi
              </motion.div>
              {/* {item.description && ( */}
              <motion.div
                className="line-clamp-3 text-xs text-muted-foreground/70"
                initial={false}
              >
                Discover unbiassed trending tokens.
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
