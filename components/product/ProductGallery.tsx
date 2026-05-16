'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [origin, setOrigin] = useState({ x: 50, y: 50 })
  const containerRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setOrigin({ x, y })
  }

  return (
    <div className="space-y-3">
      {/* Main image with zoom */}
      <div
        ref={containerRef}
        className="relative aspect-square rounded-xl overflow-hidden bg-bone cursor-zoom-in select-none"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={images[activeIndex]}
          alt={`${productName} — imagen ${activeIndex + 1}`}
          fill
          className="object-contain transition-transform duration-150 ease-out pointer-events-none"
          style={{
            transform: zoomed ? 'scale(2.2)' : 'scale(1)',
            transformOrigin: `${origin.x}% ${origin.y}%`,
          }}
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 flex-wrap" role="list" aria-label="Imágenes del producto">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                i === activeIndex
                  ? 'border-primary shadow-md'
                  : 'border-border hover:border-gray-400 opacity-70 hover:opacity-100'
              }`}
              aria-label={`Ver imagen ${i + 1}`}
              aria-pressed={i === activeIndex}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain p-1"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
