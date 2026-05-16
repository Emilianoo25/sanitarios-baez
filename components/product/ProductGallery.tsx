'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [origin, setOrigin] = useState({ x: 50, y: 50 })
  const [lightbox, setLightbox] = useState(false)
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (lightbox) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setOrigin({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  function prev() { setActiveIndex(i => (i - 1 + images.length) % images.length) }
  function next() { setActiveIndex(i => (i + 1) % images.length) }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        ref={containerRef}
        className="relative aspect-square overflow-hidden bg-bone cursor-zoom-in select-none"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setLightbox(true)}
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
        <div className="flex gap-2 flex-wrap">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden border-2 transition-all ${
                i === activeIndex ? 'border-primary' : 'border-border opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={src} alt="" fill className="object-contain p-1" sizes="80px" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox — fullscreen con pinch-zoom nativo en mobile */}
      {mounted && lightbox && createPortal(
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <span className="text-white/60 text-sm">{activeIndex + 1} / {images.length}</span>
            <button
              onClick={() => setLightbox(false)}
              className="p-2 text-white/80 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Image — overflow-auto + touch-action permite pinch zoom nativo */}
          <div
            className="flex-1 overflow-auto"
            style={{ touchAction: 'pinch-zoom' }}
          >
            <div className="min-h-full flex items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[activeIndex]}
                alt={`${productName} — imagen ${activeIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Prev / Next */}
          {images.length > 1 && (
            <div className="flex items-center justify-between px-4 py-4 shrink-0">
              <button onClick={prev} className="p-3 text-white/70 hover:text-white bg-white/10 active:bg-white/20">
                <ChevronLeft size={24} />
              </button>
              <div className="flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 transition-all ${i === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                  />
                ))}
              </div>
              <button onClick={next} className="p-3 text-white/70 hover:text-white bg-white/10 active:bg-white/20">
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  )
}
