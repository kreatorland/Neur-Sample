import Link from 'next/link';

import { cn } from '@/lib/utils';

import { DynamicImage } from './dynamic-image';

export default function Logo({
  width = 35,
  height = 35,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <DynamicImage
      lightSrc="/favicon.png"
      darkSrc="/favicon.png"
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
    <div className="bg:grey-800 flex items-center gap-2 rounded-md">
      <Logo width={50} />
      {/* <span className="text-x select-none font-bold">Neur</span> */}
    </div>
  );
}
