import React, {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Home/Navbar'
import { app } from './firebaseConfig' // Import the Firebase app instance
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth' // Assuming you're using Firebase authentication
function Layout () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

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
    <div>
      <Navbar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
