import Navigation from './NavigationClient'
import Footer from './FooterClient'

export default function PageLayout({ children }) {
  return (
    <div>
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
