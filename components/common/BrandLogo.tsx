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
        width={160}
        height={60}
        className="h-10 w-auto"
        priority
      />
    </Link>
  )
}
