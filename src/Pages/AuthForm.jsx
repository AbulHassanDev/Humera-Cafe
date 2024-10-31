import  { useState } from 'react'
import { motion } from 'framer-motion'
import Header from "../Components/Header"
import Footer from '../Components/Footer'
import {useNavigate} from "react-router-dom";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = isLogin ? 'http://localhost:3000/api/auth/login' : 'http://localhost:3000/api/auth/signup'
    const body = isLogin ? { email, password } : { username, email, password }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        const data = await response.json()
          localStorage.setItem('token', data.token)
     
        console.log('Authentication successful')
        navigate("/")

      } else {
        const errorData = await response.json()
        console.error('Authentication failed:', errorData.message)
      }
    } catch (error) {
      console.error('Error during authentication:', error)
    }
  }

  return (
    <>
    <Header />
    <div className=' min-h-[80vh] flex justify-center items-center'>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto  "
    >
      <div className="bg-black border border-yellow-600 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-yellow-600 mb-2">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          <p className="text-gray-300 mb-6">
            {isLogin ? 'Welcome back to Humera Cafe!' : 'Join Humera Cafe community'}
          </p>
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-center ${
                isLogin ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-400'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-center ${
                !isLogin ? 'text-yellow-600 border-b-2 border-yellow-600' : 'text-gray-400'
              }`}
            >
              Sign Up
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
                />
              </motion.div>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded transition duration-200"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </motion.button>
          </form>
        </div>
        <div className="px-6 py-4 bg-gray-900 text-center">
          <p className="text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-yellow-600 hover:text-yellow-500"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </motion.div>
    </div>
    <Footer />
    </>
  )
}