import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Opportunity from './components/Opportunity.jsx'
import Experience from './components/Experience.jsx'
import Concept from './components/Concept.jsx'
import Offerings from './components/Offerings.jsx'
import Attractions from './components/Attractions.jsx'
import Audience from './components/Audience.jsx'
import LocationPlan from './components/LocationPlan.jsx'
import Tracker from './components/Tracker.jsx'
import Footer from './components/Footer.jsx'
import AdminView from './components/AdminView.jsx'

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

export default function App() {
  const hash = useHash()

  // Unlinked admin route — reach it via /#admin only.
  if (hash === '#admin') return <AdminView />

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Opportunity />
        <Experience />
        <Concept />
        <Offerings />
        <Attractions />
        <Audience />
        <LocationPlan />
        <Tracker />
      </main>
      <Footer />
    </div>
  )
}
