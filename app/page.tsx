import { HeroCarousel } from '@/components/home/HeroCarousel'
import { Categories } from '@/components/home/Categories'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { SobreBaez } from '@/components/home/SobreBaez'
import { ServiceBadges } from '@/components/home/ServiceBadges'
import { getCatalog } from '@/lib/catalog'

export default async function HomePage() {
  const products = await getCatalog()
  const featured = products.filter(p => p.featured)

  return (
    <>
      <HeroCarousel />
      <ServiceBadges />
      <Categories products={products} />
      <FeaturedProducts products={featured} />
      <SobreBaez />
    </>
  )
}
