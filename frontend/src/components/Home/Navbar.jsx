import { Link, useNavigate } from 'react-router-dom' // Import Link and useNavigate
export default function Navbar ({ isLoggedIn, user, onLogout }) {
  const navigate = useNavigate() // Use navigate hook for routing

  return (
    <nav className='absolute top-0 w-full px-6 py-4 flex items-center justify-between bg-transparent z-20'>
      <div className='text-2xl font-bold text-white'>
        <Link to={'/'}>
          Zen<span className='text-[#14b8a6]'>Path</span>
        </Link>
      </div>
      <ul className='flex items-center gap-6'>
        <li className='text-white text-lg relative group'>
          <Link to='/kundli' className='hover:text-gray-300 transition'>
            Kundli
          </Link>
          <div className='absolute left-0 bottom-0 h-1 w-0 bg-[#14b8a6] transition-all duration-300 group-hover:w-full'></div>
        </li>
        <li className='text-white text-lg relative group'>
          <a
            href='https://framevr.io/zenpath'
            className='hover:text-gray-300 transition'
            target='_blank'
          >
            Meditation
          </a>
          <div className='absolute left-0 bottom-0 h-1 w-0 bg-[#14b8a6] transition-all duration-300 group-hover:w-full'></div>
        </li>
        <li className='text-white text-lg relative group'>
          <Link to='/chatbot' className='hover:text-gray-300 transition'>
            Chatbot
          </Link>
          <div className='absolute left-0 bottom-0 h-1 w-0 bg-[#14b8a6] transition-all duration-300 group-hover:w-full'></div>
        </li>
        {isLoggedIn ? (
          <div className='relative'>
            <img
              src={user?.avatar}
              alt='User Avatar'
              className='w-10 h-10 rounded-full cursor-pointer hover:scale-105 transition'
              onClick={onLogout}
              title='Click to logout'
            />
          </div>
        ) : (
          <button
            className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
            onClick={() => navigate('/login')} // Redirect to login page
          >
            Login
          </button>
        )}
      </ul>
    </nav>
  )
}
