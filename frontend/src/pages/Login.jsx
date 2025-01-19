import React, { useState } from 'react'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth

} from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { app } from '../firebaseConfig'

const auth = getAuth(app)

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleEmailLogin = async e => {
    e.preventDefault()
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      alert('Login successful!')
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  // Handle Google login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      alert('Logged in with Google!')
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold text-center text-indigo-600 mb-6'>
          Login
        </h1>

        {/* Display Error Messages */}
        {error && (
          <div className="mb-4 text-sm text-red-500 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='w-full px-3 py-2 mt-1 border rounded-md shadow-sm outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Enter your password'
              className='w-full px-3 py-2 mt-1 border rounded-md shadow-sm outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div>
            <button
              type='submit'
              className='w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Sign in
            </button>
          </div>
        </form>

        <div className='flex items-center justify-between mt-6'>
          <hr className='w-full border-gray-300' />
          <span className='px-2 text-sm text-gray-500'>or</span>
          <hr className='w-full border-gray-300' />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className='w-full px-4 py-2 mt-6 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400'
        >
          Sign in with Google
        </button>
        <div className='mt-6'>
          <span className='text-sm text-gray-700 font-medium leading-loose'>
            Don&apos;t have an account?{' '}
            <Link to='/signup' className='text-indigo-500 hover:text-indigo-600'>
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
