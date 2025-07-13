import Navigation from '../components/Navigation'
import DashboardClient from './DashboardClient'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Dashboard - HustleHack AI',
  description: 'Your personal HustleHack AI dashboard - manage your profile, resources, and account settings.',
}

export default function Dashboard() {
  return (
    <div>
      <Navigation />
      <DashboardClient />
      <Footer />
    </div>
  )
}
