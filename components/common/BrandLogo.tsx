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
        src="/logo.svg"
        alt="Sanitarios Báez"
        width={130}
        height={42}
        className="h-10 w-auto"
        priority
      />
    </Link>
  )
}
