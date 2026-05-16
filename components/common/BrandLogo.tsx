import Link from 'next/link'

interface BrandLogoProps {
  className?: string
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 ${className ?? ''}`}
      aria-label="Sanitarios Báez — Inicio"
    >
      <svg width="42" height="42" viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M16 4 C 10 12, 6 18, 6 22 C 6 27, 10 30, 16 30 C 22 30, 26 27, 26 22 C 26 18, 22 12, 16 4 Z"
          fill="#0A4D8C"
        />
        <circle cx="13" cy="20" r="2.5" fill="#FFFFFF" opacity="0.4" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[9px] tracking-[3px] text-muted font-medium uppercase">
          Sanitarios
        </span>
        <span className="font-display text-lg text-primary font-medium -tracking-[0.5px] mt-0.5">
          Baez
        </span>
      </div>
    </Link>
  )
}
