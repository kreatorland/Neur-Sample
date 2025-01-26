import Link from 'next/link';

import { cn } from '@/lib/utils';

import { DynamicImage } from './dynamic-image';

export default function Logo({
  width = 28,
  height = 28,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <DynamicImage
      lightSrc="/n.png"
      darkSrc="/n_w.png"
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

export function NLogo({ className }: BrandProps) {
  return (
    <Link href="/" className={className}>
      <div className="bg:grey-800 flex items-center gap-2 rounded-md">
        <Logo width={50} />
      </div>
    </Link>
  );
}
