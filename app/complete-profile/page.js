import Navigation from '../components/Navigation'
import CompleteProfileClient from './CompleteProfileClient'
import Footer from '../components/Footer'

// --- SEO Metadata for Onboarding/Complete Profile Page ---
export const metadata = {
  title: "Onboarding | HustleHack AI",
  description: "Set up your HustleHack AI account.",
  robots: "noindex, nofollow",
};

export default function CompleteProfile() {
  return (
    <div>
      <Navigation />
      <CompleteProfileClient />
      <Footer />
    </div>
  )
}
