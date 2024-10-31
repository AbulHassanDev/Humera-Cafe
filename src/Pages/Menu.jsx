
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from "axios";

// Assuming these image imports are correct
import h4 from '../assets/h4.jpeg'
import h8 from '../assets/h8.jpeg'
import h1 from '../assets/h1 (1).jpeg'
import h2 from '../assets/h2.jpeg'
import h3 from '../assets/h3.jpeg'
import h5 from '../assets/h5.jpeg'

const mockMenuItems = [
  { id: 1, name: 'Espresso', price: 3.5, category: 'Beverages', image: h4 },
  { id: 2, name: 'Cappuccino', price: 4.5, category: 'Beverages', image: h8 },
  { id: 3, name: 'Croissant', price: 2.5, category: 'Pastries', image: h1 },
  { id: 4, name: 'Bagel', price: 3.0, category: 'Pastries', image: h2 },
  { id: 5, name: 'Latte', price: 4.0, category: 'Beverages', image: h5 },
  { id: 6, name: 'Muffin', price: 3.0, category: 'Pastries', image: h3 },
]

const MenuItem = ({ item, onAddToCart, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.05 }}
    className="border-2 border-yellow-500 p-4 rounded-lg flex flex-col shadow-lg hover:shadow-yellow-500/50 transition-shadow duration-300"
  >
    <div className="overflow-hidden rounded-lg">
      <motion.img
        whileHover={{ scale: 1.1 }}
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover cursor-pointer"
      />
    </div>
    <h3 className="text-white text-lg font-semibold mt-4 mb-2">{item.name}</h3>
    <div className="flex justify-between items-center mt-auto">
      <div>
        <p className="text-yellow-500 text-xl font-bold">${item.price.toFixed(2)}</p>
        <p className="text-gray-400 line-through text-sm">${(item.price * 1.25).toFixed(2)}</p>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onAddToCart(item)}
        className="bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300"
      >
        Add To Cart
      </motion.button>
    </div>
  </motion.div>
)

const OrderModal = ({ isOpen, onClose, item, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

    console.log(formData)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(formData)
    try {
      const response = await axios.post("http://localhost:3000/api/menu", formData , {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(response.data)
      onSubmit(formData);
      
    } catch (error) {
      console.log(error)
      
    }
    onSubmit(formData)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-zinc-900 bg-opacity-50 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="bg-zinc-950 p-8 rounded-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-yellow-500">Order Details for {item.name}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-zinc-800 border-2 border-yellow-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors duration-300"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-zinc-800 border-2 border-yellow-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors duration-300"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 bg-zinc-800 border-2 border-yellow-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors duration-300"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter your address"
                className="w-full px-4 py-3 bg-zinc-800 border-2 border-yellow-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors duration-300"
              />
              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-600 transition duration-300"
                >
                  Place Order
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onClose}
                  className="bg-zinc-700 text-white px-4 py-2 rounded-full hover:bg-zinc-600 transition duration-300"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Component() {
  const [menuItems] = useState(mockMenuItems)
  const [cart, setCart] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const addToCart = (item) => {
    setCurrentItem(item)
    setIsModalOpen(true)
  }

  const handleOrderSubmit = (formData) => {
    setCart([...cart, { ...currentItem, ...formData }])
    setIsModalOpen(false)
    alert(`Order placed for ${currentItem.name}!`)
  }

  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mt-2 rounded-lg mx-auto p-6 bg-zinc-900 shadow-lg"
    >
      <motion.h2
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        className="text-4xl font-bold text-center mb-12 text-white"
      >
        OUR <span className="text-yellow-500">MENU</span>
      </motion.h2>

      {Object.entries(groupedMenu).map(([category, items], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.2 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold mb-6 text-yellow-500">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <MenuItem key={item.id} item={item} onAddToCart={addToCart} index={index} />
            ))}
          </div>
        </motion.div>
      ))}

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={currentItem}
        onSubmit={handleOrderSubmit}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10"
      >
        <h3 className="text-2xl font-bold mb-4 text-yellow-500">Your Cart</h3>
        {cart.length > 0 ? (
          <ul>
            {cart.map((cartItem, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-4 text-white"
              >
                {cartItem.name} - ${cartItem.price.toFixed(2)}
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Your cart is empty.</p>
        )}
      </motion.div>
    </motion.div>
  )
}