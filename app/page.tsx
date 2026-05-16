import { HeroCarousel } from '@/components/home/HeroCarousel'
import { Categories } from '@/components/home/Categories'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { SobreBaez } from '@/components/home/SobreBaez'
import { ServiceBadges } from '@/components/home/ServiceBadges'
import { ObrasPreview } from '@/components/home/ObrasPreview'

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <Categories />
      <FeaturedProducts />
      <SobreBaez />
      <ServiceBadges />
      <ObrasPreview />
    </>
  )
}
