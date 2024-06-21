import Link from 'next/link'
import colors from 'colors'

// components
import Hero from '@/components/hero.component'
import InfoBoxes from '@/components/info-boxes.component'
import HomeProperties from '@/components/home-properties.component'

const HomePage = async () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  )
}

export default HomePage
