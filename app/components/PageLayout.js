import Navigation from './Navigation'
import Footer from './Footer'

export default function PageLayout({ children }) {
  return (
    <div>
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
