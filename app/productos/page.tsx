import { ProductosClient } from '@/components/productos/ProductosClient'
import { getCatalog } from '@/lib/catalog'

export default async function ProductosPage() {
  const products = await getCatalog()
  return <ProductosClient products={products} />
}
