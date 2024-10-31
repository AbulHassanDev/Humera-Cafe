import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X } from "lucide-react"
import logo from "../assets/logo.svg"
import {Link} from "react-router-dom"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  
  const [searchQuery, setSearchQuery] = useState("")

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)



  return (
    <nav className="bg-zinc-900 fixed top-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
          <Link to={"/"}>
            <img src={logo} alt="Restaurant Logo" className="h-10 w-10" />
            </Link>
          </div>

          {/* Navigation Links for Larger Screens */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {["Home", "Menu", "Reservation", "Reviews", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:bg-zinc-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}

            </div>
          </div>

          {/* Icons Section */}
          <div className="flex items-center ">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-300 hover:bg-zinc-700 hover:text-white p-2 rounded-full"
              onClick={toggleSearch}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </motion.button>


            
            <Link to="/auth">
            <motion.button
        
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="bg-yellow-600 text-white font-bold px-4 py-2 rounded-full hover:bg-yellow-700 transition duration-300 transform hover:shadow-lg mx-4">
              Login
            </button>
          </motion.button>
          </Link>

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-gray-300 hover:bg-zinc-700 hover:text-white ml-4 p-2 rounded-full"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Open main menu</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {["Home", "Menu", "Reservation", "Reviews", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:bg-zinc-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-zinc-800 p-4 shadow-lg"
          >
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-700 text-white rounded-md py-2 px-4 outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => {
                  setSearchQuery("")
                  toggleSearch()
                }}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close search</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shopping Cart */}
      {/* <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-full md:w-96 h-full bg-zinc-800 p-4 shadow-lg overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-bold">Your Cart ({totalItems})</h2>
              <button
                onClick={toggleCart}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close cart</span>
              </button>
            </div>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-4 text-white">
                <div>
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="bg-zinc-700 px-2 py-1 rounded-md hover:bg-zinc-600"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="bg-zinc-700 px-2 py-1 rounded-md hover:bg-zinc-600"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 text-white">
              <p className="font-bold">Total: ${totalPrice.toFixed(2)}</p>
              <button className="bg-yellow-500 text-black w-full py-2 mt-4 rounded-md hover:bg-yellow-400 transition-colors duration-300">
                Checkout (${totalPrice.toFixed(2)})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </nav>
  )
}