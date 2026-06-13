import Link from 'next/link'
import Image from 'next/image'

interface BrandLogoProps {
  className?: string
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center ${className ?? ''}`}
      aria-label="Sanitarios Báez — Inicio"
    >
      <Image
        src="/logo.png"
        alt="Sanitarios Báez"
        width={808}
        height={436}
        className="h-9 w-auto sm:h-11"
        priority
      />
    </Link>
  )
}
