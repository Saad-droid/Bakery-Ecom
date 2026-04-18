import Layout from '../components/Layout'
import HeroSection from '../components/HeroSection'
import CarouselComponent from '../components/Caraosel'
import FeaturedProducts from '../components/FeaturedProducts'
import Reviews from '../components/Reviews'

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <br />
      <CarouselComponent />
      <FeaturedProducts />
      <Reviews />
    </Layout>
  )
}