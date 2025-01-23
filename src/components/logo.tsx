import Link from 'next/link';

import { cn } from '@/lib/utils';

import { DynamicImage } from './dynamic-image';

export default function Logo({
  width = 100,
  height = 31,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <DynamicImage
      lightSrc="/numble.svg"
      darkSrc="/numble_w.svg"
      alt="Logo"
      width={width}
      height={height}
      className={cn('select-none', className)}
    />
  );
}

interface BrandProps {
  className?: string;
}

export function Brand({ className }: BrandProps) {
  return (
    <Link href="/" className={className}>
      <div className="flex items-center gap-2">
        <Logo />
      </div>
    </Link>
  );
}
