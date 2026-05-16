# Sanitarios Báez — E-commerce Demo: Design Spec

**Fecha:** 2026-05-15
**Tipo:** Demo navegable para presentación al cliente
**Objetivo:** Que el cliente vea el potencial visual y firme presupuesto para v1 real

---

## 1. Contexto y alcance

Demo estática sin backend. Datos desde JSON local. Sin checkout, sin login, sin CMS.
Rutas navegables: `/`, `/productos`, `/productos/[slug]`, `/obras`, `/contacto`.
Post-cierre: v1 real con Sanity CMS, Mercado Pago, todas las features excluidas del scope demo.

### Fuera de scope (explícito)
Sanity CMS, checkout MP, carrito persistente, login, bot IA funcional, búsqueda real, newsletter, cupones, multi-idioma, admin dashboard.

---

## 2. Stack técnico

- Next.js 14 App Router + TypeScript estricto
- Tailwind CSS 3.4+ con design tokens custom en `tailwind.config.ts`
- shadcn/ui (componentes base)
- Framer Motion (animaciones sutiles)
- Lucide React (iconografía)
- Fuentes: Fraunces (display) + Inter (UI) vía `next/font`
- Deploy: Vercel

---

## 3. Arquitectura de datos (Enfoque A — escalable a Sanity)

```
/data/products.json          → fuente de verdad (demo, 6 productos)
/types/product.ts            → interface Product (contrato inmutable)
/lib/products.ts             → getAllProducts(), getProductBySlug(),
                               getProductsByCategory(), getFeaturedProducts()
```

**Principio clave:** todo el código (páginas, componentes) importa SOLO desde `lib/products.ts`.
Nunca importan `products.json` directamente. Cuando llegue Sanity, solo se edita `lib/products.ts`.

### Migración futura a Sanity (v1)
1. Reemplazar implementación de `lib/products.ts` con queries GROQ
2. Agregar schema Sanity para `Product`
3. Cero cambios en componentes o páginas

---

## 4. Sistema de diseño

### Paleta
```
primary:        #0A4D8C
primary-light:  #1E6BAD
primary-dark:   #073661
accent:         #FF6B35
accent-hover:   #E55520
bone:           #F8F7F4
ink:            #1A1A1A
muted:          #5A6B7D
border:         #E8E8E8
success:        #16A34A
```

### Tipografía
- `font-display`: Fraunces serif — titulares
- `font-sans`: Inter — UI y body
- Weights: 400, 500, 600 (no 700/900)

### Animaciones (Framer Motion)
- Hero: fade-in con stagger en hijos
- Cards: hover scale 1.02, 200ms ease-out
- Scroll reveal: opacity + translateY 20px → 0
- Sin bounces, rotaciones, ni efectos llamativos

---

## 5. Estructura de rutas y páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Homepage: Hero, Categorías, Productos destacados, Service badges, Obras preview, Footer |
| `/productos` | Catálogo con filtros laterales (categoría, marca, precio, stock), grid filtrado en memoria |
| `/productos/[slug]` | Detalle: galería, specs acordeón, botones dobles de consulta |
| `/obras` | 3 cards placeholder con imagen fake |
| `/contacto` | Formulario + datos del local |

---

## 6. Feature crítico: botones dobles de consulta

En CADA ProductCard y en `/productos/[slug]`:

```
[Sparkles] Consultar con asistente IA   → abre AIModalPlaceholder
[MessageCircle] Consultar por WhatsApp  → wa.me/5491163658651 con mensaje pre-armado
```

En ProductCard: visibles en hover (desktop) / siempre visibles (mobile).
En `/productos/[slug]`: protagonistas, full width, debajo del precio.

### Helper WhatsApp
```ts
// lib/whatsapp.ts
const BAEZ_PHONE = "5491163658651";
export function whatsappUrl(product: Product): string
```

---

## 7. Modal Asistente IA (placeholder)

No funcional. Modal informativo con:
- Lista de capabilities futuras (con Check icons)
- CTA final a WhatsApp como alternativa presente
- Focus trap + ESC para cerrar + return focus al trigger
- Botón flotante esquina inferior derecha con pulse animation

Botón WhatsApp flotante adicional en esquina inferior izquierda.

---

## 8. Componentes principales

```
components/layout/     → Navbar, Footer, MobileMenu
components/product/    → ProductCard, ProductGrid, ProductGallery, ProductSpecs, ProductActions
components/filters/    → FilterSidebar, FilterChips
components/ai-assistant/ → AIButton, AIModalPlaceholder
components/whatsapp/   → WhatsAppButton
components/home/       → Hero, FeaturedProducts, Categories, ServiceBadges
components/common/     → Container, Section, BrandLogo
```

---

## 9. Homepage — Hero visual

Imagen placeholder `placehold.co` de ambiente de baño premium (lado derecho en desktop, abajo en mobile).

---

## 10. /obras — contenido demo

3 cards con imagen `placehold.co`, título de ambiente y descripción breve. Sin datos reales.

---

## 11. Carrito

Ícono visible en navbar con badge "0". Click no funcional. Foco en botones de consulta.

---

## 12. Accesibilidad (WCAG AA mínimo)

- Roles ARIA correctos
- Alt text en todas las imágenes
- Focus visible en navegación por teclado
- Contraste mínimo 4.5:1
- Skip to main content link
- Labels asociados a inputs
- Semántica HTML correcta (header/nav/main/footer)
- Modal: focus trap, ESC para cerrar, return focus al trigger

---

## 13. Responsividad

Breakpoints: 375px / 414px / 768px / 1024px+
- Navbar → drawer mobile
- Hero → stack vertical, imagen abajo
- Grids 3col → 2col → 1col
- Detalle producto → imagen arriba, info abajo
- Botones consulta → full width en mobile
- Flotantes AI + WhatsApp siempre visibles

---

## 14. Performance

- `next/image` (lazy loading)
- `next/font` (no FOUT)
- Code splitting por ruta (App Router default)
- Target: Lighthouse Performance >90, Accessibility >95
- Sin warnings en consola
