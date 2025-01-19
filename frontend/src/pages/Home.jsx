import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChartColumnDecreasing } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom' // Import useNavigate for routing
import { app } from '../firebaseConfig' // Import the Firebase app instance
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth' // Assuming you're using Firebase authentication
import SpotlightCard from '../components/Home/SpotlightCard'
import AstrologyHouses from '../components/Home/AstrologyHouses'
import Navbar from '../components/Home/Navbar'

const features = [
  {
    icon: 'fa fa-star',
    title: 'Kundali Generation',
    description:
      'Generate personalized Kundalis with accurate astrological calculations.',
    buttonText: 'Learn more',
    spotlightColor: 'rgba(0, 229, 255, 0.2)'
  },
  {
    icon: 'fa fa-heart',
    title: 'Kundali Matching',
    description:
      'Find your perfect match with detailed Kundali compatibility analysis.',
    buttonText: 'Learn more',
    spotlightColor: 'rgba(255, 0, 127, 0.2)'
  },
  {
    icon: 'fa fa-lightbulb',
    title: 'Astrological Insights',
    description:
      'Get deep insights into your life based on astrological principles.',
    buttonText: 'Learn more',
    spotlightColor: 'rgba(255, 195, 0, 0.2)'
  },
  {
    icon: 'fa fa-comments',
    title: 'Daily Horoscope on WhatsApp',
    description:
      'Receive personalized daily horoscope updates directly on WhatsApp.',
    buttonText: 'Learn more',
    spotlightColor: 'rgba(0, 255, 127, 0.2)'
  },
  {
    icon: 'fa fa-dumbbell',
    title: 'AI Meditation & Workout',
    description:
      'AI-powered recommendations for personalized meditation and workout plans.',
    buttonText: 'Learn more',
    spotlightColor: 'rgba(127, 0, 255, 0.2)'
  },
  {
    icon: 'fa fa-robot',
    title: 'Astrology Chatbot',
    description:
      'Chat with our intelligent bot for instant astrological advice and guidance.',
    buttonText: 'Learn more',
    spotlightColor: 'rgba(255, 69, 0, 0.2)'
  }
]

const ParticleBackground = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const initialParticles = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 5 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      opacity: Math.random() * 0.5 + 0.1
    }))

    setParticles(initialParticles)

    const animate = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x:
            (particle.x + particle.speedX + window.innerWidth) %
            window.innerWidth,
          y:
            (particle.y + particle.speedY + window.innerHeight) %
            window.innerHeight
        }))
      )
    }

    const frame = setInterval(animate, 50)
    return () => clearInterval(frame)
  }, [])

  return (
    <div className='fixed inset-0 pointer-events-none'>
      {particles.map((particle, index) => (
        <div
          key={index}
          className='absolute rounded-full'
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
            background:
              'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)',
            boxShadow: `0 0 ${particle.size * 4}px rgba(255, 255, 255, 0.8)`
          }}
        />
      ))}
    </div>
  )
}

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const auth = getAuth(app) // Assuming you're using Firebase authentication

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setIsLoggedIn(true)
        setUser({ avatar: currentUser.photoURL }) // Set user data
      } else {
        setIsLoggedIn(false)
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      alert('You have been logged out!')
    } catch (error) {
      console.error('Error logging out:', error.message)
    }
  }

  return (
    <div className='relative min-h-screen overflow-hidden bg-gray-900'>
      <ParticleBackground />
      <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
      <main className='z-10 w-full px-4 sm:px-6 lg:px-8 py-6 mt-40 flex flex-col items-center justify-center text-center'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-[80%] my-24'
        >
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-100'>
            Unlock the Power of Your Data with DataStax and Langflow
          </h1>
          <p className='mt-4 text-lg sm:text-xl lg:text-2xl text-gray-400'>
            Empower your digital transformation with DataStax's cutting-edge
            data infrastructure and Langflow's AI-driven insights. Leverage
            scalable data solutions and real-time analytics to refine your
            strategy and drive better outcomes.
          </p>
          <div className='flex justify-center items-center gap-4'>
            <Link
              to={isLoggedIn ? '/kundli': '/signup'} // Redirect to /signin
            >
              <div className='w-fit flex justify-center items-center mt-8 text-[#4c4fee] gap-2 px-4 py-2 bg-gray-200 rounded-lg'>
                <ChartColumnDecreasing size={28} />
                <p className='font-medium text-lg'>Get Started</p>
              </div>
            </Link>
          </div>
        </motion.div>
        <section className='z-10 w-full max-w-[80%] my-24 px-4 py-12'>
          <h2 className='text-3xl font-bold text-center text-white mb-8'>
            Features That Drive Innovation
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
            {features.map((feature, index) => (
              <SpotlightCard
                key={index}
                className='custom-spotlight-card relative h-58'
                spotlightColor={feature.spotlightColor}
              >
                <i className={`${feature.icon} + text-white`}></i>
                <h2 className='text-white text-2xl font-semibold leading-relaxed text-left'>
                  {feature.title}
                </h2>
                <p className='text-gray-400 text-sm leading-relaxed text-left my-2 mb-16'>
                  {feature.description}
                </p>
                <button className='text-white py-2 px-3 bg-gradient-to-b from-[#222222] to-[#000000] rounded-lg absolute left-8 bottom-4'>
                  {feature.buttonText}
                </button>
              </SpotlightCard>
            ))}
          </div>
        </section>
        <section className='z-10 w-full max-w-[80%] my-24 px-4 py-12'>
          <h2 className='text-3xl font-bold text-center text-white mb-8'>
            Get Familiar with the Houses
          </h2>
          <AstrologyHouses />
        </section>
      </main>
    </div>
  )
}

export default Home
