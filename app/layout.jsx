import '@/assets/styles/globals.css' // @ - root

// add metadata
export const metadata = {
  title: 'MyHub | Find the Perfect Rental',
  description: 'Find your dream rental property within minutes.',
  keywords: 'rental, find rentals, find properties',
}

const MainLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div>{children}</div>
      </body>
    </html>
  )
}

export default MainLayout
