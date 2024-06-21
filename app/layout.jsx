// components
import '@/assets/styles/globals.css' // @ - root
import Footer from '@/components/footer.component'
import NavBar from '@/components/navbar.component'

// Metadata
export const metadata = {
  title: 'MyHub | Find the Perfect Rental',
  description: 'Find your dream rental property within minutes.',
  keywords: 'rental, find rentals, find properties',
}

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

export default MainLayout
