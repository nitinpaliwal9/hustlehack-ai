import Navigation from '../components/NavigationClient'
import DashboardClient from './DashboardClient'
import Footer from '../components/FooterClient'

// --- SEO Metadata for Private Dashboard Page ---
export const metadata = {
  title: "Dashboard | HustleHack AI",
  description: "Your personalized AI dashboard. Private area.",
  robots: "noindex, nofollow",
};

export default function Dashboard() {
  return (
    <div>
      <Navigation />
      <DashboardClient />
      <Footer />
    </div>
  )
}
