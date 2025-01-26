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
  X,
  XIcon,
  ZapIcon,
} from 'lucide-react';

import { FeatureLists } from '@/components/data';
import { HelperComponent } from '@/components/helper-component';
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
// import GridDotPattern from '@/components/ui/grid-dot';
import GridDotPattern from '@/components/ui/grid-dot';
import { IntegrationsBackground } from '@/components/ui/integrations-background';
import Marquee from '@/components/ui/marquee';
import { RainbowButton } from '@/components/ui/rainbow-button';
// import SmallDotPattern from '@/components/ui/small-dot-pattern';
// import SmallDotPattern from '@/components/ui/small-dot-pattern';
import SmallDotPattern from '@/components/ui/small-dot-pattern';
import { decryptPrivateKey } from '@/lib/solana/wallet-generator';
import { cn } from '@/lib/utils';

import { INTEGRATIONS } from './(user)/home/data/integrate';

const DEEPSEEK_API_KEY = 'sk-b703e705496345978edf916ae40046a3';

const navItems = [
  { label: 'Price', href: '#', icon: DollarSign },
  { label: 'FAQ', href: '#', icon: FileQuestion },
  { label: 'Github', href: '#', icon: GitHubLogoIcon },
  { label: 'Docs', href: 'https://docs.lyth.ai/', icon: BookOpenIcon },
];

const socailMedia = [
  { href: 'https://x.com/Lyth_ai', icon: TwitterIcon },
  { href: 'https://t.me/lyth_ai', icon: SendIcon },
  { href: 'https://docs.lyth.ai/', icon: BookOpenIcon },
];

const Header = ({ handleLogin }: { handleLogin: () => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const decrypt = async () => {
    console.log('private key');
    console.log(
      'omm',
      await decryptPrivateKey(
        'dZPsax71kWTZc15iJA6w2uaWG4f3ZoNA3yLftou7VXGgtyFfzX82wCmUe6aM1ifeZxl8EQR/WH5wbpRtGe6kqmSbjDhh7xVww+ndDMJ4qnPf5DqR4nnt+mUmKzYLjfKRadrzk6VrRX6QepsilgcHKg==',
      ),
    );
    const data = await decryptPrivateKey(
      'dZPsax71kWTZc15iJA6w2uaWG4f3ZoNA3yLftou7VXGgtyFfzX82wCmUe6aM1ifeZxl8EQR/WH5wbpRtGe6kqmSbjDhh7xVww+ndDMJ4qnPf5DqR4nnt+mUmKzYLjfKRadrzk6VrRX6QepsilgcHKg==',
    );
    console.log('private key', data);
  };
  return (
    <BlurFade delay={0.1} className="relative z-50">
      <header className="fixed left-0 right-0 top-0">
        <div className="mx-auto  px-4 py-4">
          <div className="rounded-xl ">
            <div className="flex items-center justify-center px-4 py-2">
              <div className="relative">
                <Brand className="scale-95 transition-opacity hover:opacity-80" />
              </div>
              {/* <button
                onClick={() => {
                  decrypt();
                }}
              >
                decrypt
              </button> */}
              {/* <nav className="hidden  md:mr-8 md:flex">
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
               
              </nav> */}
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
          <BlurFade delay={0.3} className="pointer-events-none select-none">
            <div className="relative inline-flex items-center bg-transparent backdrop-blur-sm">
              <div className="relative text-[60px] font-medium text-primary sm:text-[60px] md:text-[140px] lg:text-[160px] xl:text-[80px] 2xl:text-[100px]">
                Lyth
              </div>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              The{' '}
              <AnimatedShinyText className="inline">
                <span>Intelligent DeFAI Agent powered by Deepseek R1. </span>
              </AnimatedShinyText>{' '}
              Trade, launch & analysis on<span> Solana</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="mt-8">
              <RainbowButton
                onClick={handleLogin}
                className="h-12 min-w-[180px] bg-[#bfea0b] text-base transition-all duration-300 hover:scale-105"
                style={{ background: '#C6F201' }}
              >
                Try Lyth
              </RainbowButton>
            </div>
          </BlurFade>
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
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="h-22 mt-8 py-4">
      <BlurFade
        delay={0.5}
        className="mx-auto flex  w-[75%] flex-col text-muted-foreground"
      >
        <div className="b flex items-center justify-center gap-3 border-b border-dotted border-neutral-200 pb-4 dark:border-neutral-700">
          <div>
            <Brand className="scale-95 transition-opacity hover:opacity-80" />
          </div>
          <X
            className="color-[#C6F201] h-6  w-6"
            style={{ color: '#C6F201' }}
          ></X>
          <img src={'/deepseek.webp'} alt="" style={{ width: '180px' }}></img>
        </div>
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
      window.location.href = 'https://x.com/Lyth_ai';
    };
  }

  return (
    <div className="flex flex-col">
      {/* <DotPattern /> */}
      <Header handleLogin={login} />
      <main className="flex-1">
        <Hero handleLogin={login} />
        {/* <Marque></Marque> */}

        {/* <Lobsang></Lobsang> */}
      </main>
      <Footer />
    </div>
  );
}
