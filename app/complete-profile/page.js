import Navigation from '../components/Navigation'
import CompleteProfileClient from './CompleteProfileClient'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Complete Your Profile - HustleHack AI',
  description: 'Complete your profile to get started with HustleHack AI - the ultimate platform for students, creators, and entrepreneurs.',
}

export default function CompleteProfile() {
  return (
    <div>
      <Navigation />
      <CompleteProfileClient />
      <Footer />
    </div>
  )
}
