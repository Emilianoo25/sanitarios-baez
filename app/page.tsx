import { Hero } from '@/components/home/Hero'
import { Categories } from '@/components/home/Categories'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { ServiceBadges } from '@/components/home/ServiceBadges'
import { ObrasPreview } from '@/components/home/ObrasPreview'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <ServiceBadges />
      <ObrasPreview />
    </>
  )
}
