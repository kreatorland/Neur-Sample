'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useLogin } from '@privy-io/react-auth';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { RiTwitterXFill } from '@remixicon/react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import {
  ActivityIcon,
  BadgeDollarSign,
  BookOpenIcon,
  BotIcon,
  BrainCircuitIcon,
  BrainIcon,
  DollarSign,
  FileQuestion,
  FingerprintIcon,
  FolderKanbanIcon,
  LinkIcon,
  SendIcon,
  ShieldIcon,
  TwitterIcon,
  WalletIcon,
  WorkflowIcon,
  XIcon,
  ZapIcon,
} from 'lucide-react';

import { Brand } from '@/components/logo';
// import { ReviewCard } from '@/components/review-card';
import { ThemeToggle } from '@/components/theme-toggle';
import { AiParticlesBackground } from '@/components/ui/ai-particles-background';
import AnimatedShinyText from '@/components/ui/animated-shiny-text';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import BlurFade from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Circle } from '@/components/ui/circle';
import DotPattern from '@/components/ui/dot-pattern';
import { IntegrationsBackground } from '@/components/ui/integrations-background';
import Marquee from '@/components/ui/marquee';
import { RainbowButton } from '@/components/ui/rainbow-button';
// import SmallDotPattern from '@/components/ui/small-dot-pattern';
import SmallDotPattern from '@/components/ui/small-dot-pattern';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Price', href: '#', icon: DollarSign },
  { label: 'FAQ', href: '#', icon: FileQuestion },
  { label: 'Github', href: '#', icon: GitHubLogoIcon },
  { label: 'Docs', href: 'https://docs.numble.ai/', icon: BookOpenIcon },
];

const socailMedia = [
  { href: 'https://x.com/Numble_ai', icon: TwitterIcon },
  { href: 'https://t.me/numble_ai', icon: SendIcon },
  // { href: 'https://x.com/Numble_ai', icon: DiscordIcon },
];

const Header = ({ handleLogin }: { handleLogin: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <BlurFade delay={0.1} className="relative z-50">
      <header className="fixed left-0 right-0 top-0">
        <div className="mx-auto  px-4 py-4">
          <div className="rounded-xl ">
            <div className="flex items-center justify-between px-4 py-2">
              <div className="relative">
                <Brand className="scale-95 transition-opacity hover:opacity-80" />
              </div>

              <nav className="hidden  md:mr-8 md:flex">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                      <span className="absolute inset-x-4 -bottom-px h-px scale-x-0 bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 transition-transform duration-300 group-hover:scale-x-100" />
                    </motion.a>
                  );
                })}
                {/* <ThemeToggle></ThemeToggle> */}
              </nav>

              <div className="flex items-center gap-3">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button
                    variant="outline"
                    className="h-9 rounded-lg bg-primary px-4 text-sm text-white transition-colors hover:bg-primary hover:text-primary-foreground dark:bg-primary dark:text-black"
                    onClick={handleLogin}
                  >
                    Try Numble
                  </Button>
                </motion.div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 md:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="absolute left-4 right-4 top-full mt-2 rounded-lg border border-border/50 bg-background/95 p-3 shadow-lg backdrop-blur-md md:hidden">
              <nav className="flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>
    </BlurFade>
  );
};

const Hero = ({ handleLogin }: { handleLogin: () => void }) => {
  const productRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: productRef,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [30, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  return (
    <section className="relative pt-[5.75rem]" ref={productRef}>
      {/* Content */}
      <div className="relative mx-auto max-w-screen-xl px-6 pb-6 pt-12 text-center md:pb-8 md:pt-16">
        <div className="mx-auto max-w-3xl">
          <BlurFade delay={0.4}>
            <div className="mb-8 mt-8 flex justify-center gap-4">
              {socailMedia.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9, rotate: '2.5deg' }}
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-1 px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Icon className="h-7 w-7" />
                  </motion.a>
                );
              })}
            </div>
          </BlurFade>

          <BlurFade delay={0.3} className="pointer-events-none select-none">
            <div className="relative inline-flex items-center bg-transparent backdrop-blur-sm">
              <div className="relative text-[60px] font-medium text-primary sm:text-[60px] md:text-[140px] lg:text-[160px] xl:text-[80px] 2xl:text-[100px]">
                NUMBLE.AI
                {/* Top-right border */}
                <div className="absolute right-[-28px] top-[6px] h-10 w-10 border-r-2 border-t-2 border-gray-800 dark:border-white"></div>
                {/* Bottom-left border */}
                <div className="absolute bottom-[-7px] left-[-30px] h-10 w-10 border-b-2 border-l-2 border-gray-800 dark:border-white"></div>
              </div>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              The{' '}
              <AnimatedShinyText className="inline">
                <span>Intelligent AI Agent Engine </span>
              </AnimatedShinyText>{' '}
              to perform on-chain tasks on <span>Solana</span>
            </h1>

            <p className="mt-4 text-lg text-muted-foreground">
              Experience Solana on-chain actions using powerful AI Engine from
              Numble
            </p>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="mt-8">
              <RainbowButton
                onClick={handleLogin}
                className="h-12 min-w-[180px] text-base transition-all duration-300 hover:scale-105"
              >
                Try Numble
              </RainbowButton>
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Product Preview */}
      <div className="relative w-full">
        <BlurFade delay={0.6} className="mx-auto max-w-screen-2xl px-6">
          <div className="relative">
            {/* Product images */}
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{
                rotateX,
                scale,
                opacity,
                transformPerspective: 1000,
              }}
              transition={{
                type: 'spring',
                stiffness: 50,
                damping: 20,
                delay: 0.5,
              }}
              className="relative mx-auto w-full max-w-[1200px] will-change-transform"
            >
              <div className="group relative overflow-hidden rounded-2xl border bg-card shadow-2xl">
                {/* Light mode image */}
                <div className="relative dark:hidden">
                  <Image
                    src="/product.png"
                    alt="Neur AI Interface"
                    width={1200}
                    height={675}
                    className="w-full rounded-2xl"
                    priority
                  />
                </div>
                {/* Dark mode image */}
                <div className="relative hidden dark:block">
                  <Image
                    src="/product_dark.png"
                    alt="Neur AI Interface"
                    width={1200}
                    height={675}
                    className="w-full rounded-2xl"
                    priority
                  />
                </div>
                <BorderBeam
                  className="opacity-0 group-hover:opacity-100"
                  duration={10}
                  size={300}
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -left-4 -top-4 h-72 w-72 animate-blob rounded-full bg-primary/5 mix-blend-multiply blur-xl" />
              <div className="animation-delay-2000 absolute -right-4 -top-4 h-72 w-72 animate-blob rounded-full bg-secondary/5 mix-blend-multiply blur-xl" />
            </motion.div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

// const Features = () => {
//   return (
//     <BlurFade delay={0.5} className="sm:py-15 py-15 relative mb-10">
//       <div className="mx-auto max-w-6xl px-4 sm:px-6">
//         <Marquee className="absolute inset-0 h-[100px] [--duration:15s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
//           {Array.from({ length: 5 }).map((_, idx) => (
//             <ReviewCard key={idx} />
//           ))}
//         </Marquee>
//       </div>
//     </BlurFade>
//   );
// };

const Lobsang = () => {
  const [inView, setInView] = useState(false);
  const controls = useAnimation();

  const handleScroll = () => {
    const position = window.scrollY;
    console.log('positon', position);
    if (position > 1400) {
      // alert('inview');
      // Adjust the scroll trigger value
      setInView(true);
    } else {
      setInView(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <BlurFade delay={0.5} className="relative py-5 sm:py-10">
      <div className="w-fit-content mx-auto w-[70%] px-4 sm:px-6">
        <motion.div
          className="mx-auto grid  grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
          animate={controls}
          initial={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div
            className=" flex flex-col items-center  gap-2 p-0 sm:order-3 xl:order-2 2xl:order-2"
            animate={inView ? { opacity: 1, x: -10 } : { opacity: 0, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className=" h-[280px] w-[350px] p-8">
              <CardContent className="flex flex-col space-y-4 p-0 ">
                <Circle>
                  <WalletIcon></WalletIcon>
                </Circle>
                <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 sm:text-xl">
                  Wallet Management
                </h3>

                <CardDescription className="w-50 max-w-lg text-sm text-neutral-400 sm:text-base">
                  <h4>Manage secure Solana wallets.</h4>
                  <h4>Transfer Solana to other addresses.</h4>
                  <h4>Handle Solana-based token transfers.</h4>
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="h-[280px] w-[350px] p-8">
              <CardContent className="flex flex-col  space-y-4 p-0 ">
                <Circle>
                  <BadgeDollarSign></BadgeDollarSign>
                </Circle>
                <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 sm:text-xl">
                  NFT Marketplace Integration
                </h3>

                <CardDescription className="w-50 max-w-lg text-sm text-neutral-400 sm:text-base">
                  <h4>Trade Solana NFTs in marketplaces.</h4>
                  <h4>Analyze NFT trends and opportunities.</h4>
                  <h4>Mint Solana NFTs during events.</h4>
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="h-[280px] w-[350px] p-8">
              <CardContent className="flex flex-col  space-y-4 p-0 ">
                <Circle>
                  <WorkflowIcon></WorkflowIcon>
                </Circle>
                <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 sm:text-xl">
                  Protocol Integrations
                </h3>

                <CardDescription className="w-50 max-w-lg text-sm text-neutral-400 sm:text-base">
                  <h4>Integrate with Solana DeFi protocols.</h4>
                  <h4> Interact with liquidity pools and lending platforms.</h4>
                  <h4> Handle staking, yield farming, and more.</h4>
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
          {/* 3 */}
          <motion.div
            className=" order-1 flex flex-col items-center justify-start gap-6 sm:order-1 xl:order-3 2xl:order-3"
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-3 text-2xl font-bold tracking-tight sm:mb-4 sm:text-4xl">
              Tailored for Solana
            </h2>

            <Card className="h-[280px] w-[350px] p-8">
              <CardContent className="flex flex-col  space-y-4 p-0 ">
                <Circle>
                  <BrainIcon></BrainIcon>
                </Circle>
                <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 sm:text-xl">
                  Customizable Automation
                </h3>

                <CardDescription className="w-50 max-w-lg text-sm text-neutral-400 sm:text-base">
                  <p>Execute workflows for token trading.</p>
                  <h4> Pre-set AI strategies handle automated trading.</h4>
                  <h4> Manage memecoin creation and market actions.</h4>
                </CardDescription>
              </CardContent>
            </Card>
            <Card className=" h-[280px] w-[350px] p-8">
              <CardContent className="flex flex-col  space-y-4 p-0 ">
                <Circle>
                  <FingerprintIcon></FingerprintIcon>
                </Circle>
                <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 sm:text-xl">
                  Portfolio Management
                </h3>

                <CardDescription className="w-50 max-w-lg text-sm text-neutral-400 sm:text-base">
                  <p>Optimize Solana asset portfolios.</p>
                  <h4> Monitor performance with detailed analytics.</h4>
                  <h4> Suggest rebalancing to maximize returns.</h4>
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          {/* 4th */}
          <motion.div
            className=" flex flex-col items-center justify-center gap-2 p-0 sm:order-4 xl:order-4 2xl:order-4"
            animate={inView ? { opacity: 1, x: 10 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-[280px] w-[350px] p-8">
              <CardContent className="flex flex-col  space-y-4 p-0 ">
                <Circle>
                  <BotIcon></BotIcon>
                </Circle>
                <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 sm:text-xl">
                  AI-Driven Market Analysis
                </h3>

                <CardDescription className="w-50 max-w-lg text-sm text-neutral-400 sm:text-base">
                  <p>Analyze Solana market trends.</p>
                  <h4>Track trending tokens with real-time.</h4>
                  <h4> Predict token price movements for strategies.</h4>
                </CardDescription>
              </CardContent>
            </Card>
            <motion.div whileHover={{ scale: 1.1, shadow: 'xl' }}>
              <Card className=" h-[280px] w-[350px] p-8">
                <CardContent className="flex flex-col  space-y-4 p-0 ">
                  <Circle>
                    <ActivityIcon></ActivityIcon>
                  </Circle>
                  <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 sm:text-xl">
                    Automated Crypto Actions
                  </h3>

                  <CardDescription className="w-50 max-w-lg text-sm text-neutral-400 sm:text-base">
                    <p>Create Solana memecoins autonomously</p>
                    <h4>Automate token purchases based on trends.</h4>
                    <h4>Analyze sentiment for market impact.</h4>
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <Card className="h-[280px]  w-[360px]  p-8 sm:order-5">
              <CardContent className="flex flex-col space-y-4  p-0">
                <Circle>
                  <FolderKanbanIcon></FolderKanbanIcon>
                </Circle>
                <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 sm:text-xl">
                  Token Management
                </h3>

                <CardDescription className="w-50 max-w-lg text-sm text-neutral-400 sm:text-base">
                  <p>Create and customize private AI agents.</p>
                  <h4>Market analysis and token purchases.</h4>
                  <h4> Manage transactions and monitor price movements.</h4>
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </BlurFade>
  );
};

const Marque = () => {
  return (
    <BlurFade
      delay={0.5}
      className="mx-auto mb-6 mt-11  flex w-[50%] flex-col text-muted-foreground"
    >
      <div className="flex justify-center">
        <h2 className="mb-2 text-2xl font-bold tracking-tight sm:mb-4 sm:text-4xl">
          Trusted by team around the world.
        </h2>
      </div>
      <div className=" white masked-div flex overflow-hidden border-neutral-200 dark:border-neutral-700">
        <motion.div
          className="flex w-[100%] shrink-0 items-center justify-around  whitespace-nowrap py-10"
          animate={{ x: ['0', '-100%'] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
        >
          {Array.from({ length: 6 }).map((_, idx) => (
            <div className="w-50 " key={idx}>
              <Brand className="scale-95 transition-opacity hover:opacity-80" />
            </div>
          ))}
        </motion.div>
        <motion.div
          className="flex w-[100%] shrink-0 items-center justify-around whitespace-nowrap py-10"
          animate={{ x: ['0', '-100%'] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
        >
          {Array.from({ length: 6 }).map((_, idx) => (
            <div className="w-50 " key={idx}>
              <Brand className="scale-95 transition-opacity hover:opacity-80" />
            </div>
          ))}
        </motion.div>
      </div>
    </BlurFade>
  );
};

const Footer = () => {
  return (
    <footer className="h-22 mt-8 py-4">
      <BlurFade
        delay={0.5}
        className="mx-auto flex  w-[75%] flex-col text-muted-foreground"
      >
        <div className="b flex justify-between gap-3 border-b border-dotted border-neutral-200 pb-4 dark:border-neutral-700">
          <div>
            <Brand className="scale-95 transition-opacity hover:opacity-80" />
          </div>

          <div className="flex  gap-4">
            <div>
              <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 sm:text-xl">
                Site
              </h3>
              <div className="flex flex-col">
                {/* flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary */}
                <a href="https://docs.numble.ai/" target="_blank">
                  <h3 className="text-sm  font-medium text-muted-foreground transition-colors hover:text-primary ">
                    Docs
                  </h3>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 sm:text-xl">
                Social
              </h3>
              <div className="flex flex-col">
                <a href="Twitter url: https://x.com/NumbleAI" target="_blank">
                  <h3 className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                    Twitter
                  </h3>
                </a>
                <a href="https://t.me/numble_ai" target="_blank">
                  <motion.h3 className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                    Telegram
                  </motion.h3>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <p>© 2025 Numble.AI. All rights reserved.</p>
        </div>

        {/* <span>|</span>
        <Link
          href="https://x.com/neur_sh"
          target="_blank"
          title="Follow us on X"
          className="transition-colors hover:scale-105 hover:text-primary"
        >
          <RiTwitterXFill className="h-4 w-4" />
        </Link> */}
      </BlurFade>
    </footer>
  );
};

export default function Home() {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  const router = useRouter();
  let { login } = useLogin({
    onComplete: (
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      loginAccount,
    ) => {
      router.push('/home');
    },
  });

  if (isMaintenanceMode) {
    login = () => {
      window.location.href = 'https://x.com/neur_sh';
    };
  }

  return (
    <div className="flex flex-col">
      <DotPattern />
      <Header handleLogin={login} />
      <main className="flex-1">
        <Hero handleLogin={login} />
        <Marque></Marque>
        {/* <IntegrationsBackground></IntegrationsBackground> */}
        <SmallDotPattern></SmallDotPattern>
        {/* <Features /> */}
        <Lobsang></Lobsang>
        <SmallDotPattern></SmallDotPattern>
      </main>
      <Footer />
    </div>
  );
}
