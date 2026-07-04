import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getAllProducts } from '@/lib/products'
import { getCatalog } from '@/lib/catalog'
import { hasDiscount, salePrice } from '@/lib/price'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductSpecs } from '@/components/product/ProductSpecs'
import { ProductActionsWrapper } from '@/components/product/ProductActionsWrapper'
import { RelatedProductsSection } from '@/components/product/RelatedProductsSection'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/ui/badge'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map(p => ({ slug: p.slug }))
}

export default async function ProductoPage({ params }: Props) {
  const catalog = await getCatalog()
  const product = catalog.find(p => p.slug === params.slug)
  if (!product) notFound()

  const related = catalog
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-8">
        <nav
          className="flex items-center gap-1.5 text-xs text-muted mb-8 flex-wrap"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-primary transition-colors">
            Inicio
          </Link>
          <ChevronRight size={12} aria-hidden="true" />
          <Link href="/productos" className="hover:text-primary transition-colors">
            Productos
          </Link>
          <ChevronRight size={12} aria-hidden="true" />
          <Link
            href={`/productos?categoria=${product.category}`}
            className="hover:text-primary transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight size={12} aria-hidden="true" />
          <span className="text-ink truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="space-y-5">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {product.brand}
              </span>
              <h1 className="font-display text-3xl font-medium text-ink mt-2 leading-snug">
                {product.name}
              </h1>
              <p className="text-xs text-muted mt-1">SKU: {product.sku}</p>
            </div>

            <div>
              <div className="flex items-baseline gap-3">
                <p className="font-display text-4xl font-medium text-primary nums-tabular">
                  ${salePrice(product).toLocaleString('es-AR')}
                </p>
                {hasDiscount(product) && (
                  <>
                    <span className="text-lg text-muted line-through nums-tabular">
                      ${product.price.toLocaleString('es-AR')}
                    </span>
                    <span className="bg-accent px-2 py-0.5 text-xs font-bold text-white">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <div>
              {product.inStock ? (
                <Badge className="bg-success/10 text-success border-0 hover:bg-success/10">
                  En stock
                </Badge>
              ) : (
                <Badge className="bg-muted/10 text-muted border-0 hover:bg-muted/10">
                  Sin stock
                </Badge>
              )}
            </div>

            <p className="whitespace-pre-line text-sm text-muted leading-relaxed">{product.description}</p>

            <ProductActionsWrapper product={product} />

            <ProductSpecs specs={product.specs} />
          </div>
        </div>

        <RelatedProductsSection products={related} />
      </Container>
    </div>
  )
}
