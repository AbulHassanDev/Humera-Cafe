
import  { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Component() {
  const [displayedText, setDisplayedText] = useState("")
  const fullText = "Welcome to Humera Cafe"

  useEffect(() => {
    let index = 0
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => {
        if (index < fullText.length) {
          index++
          return fullText.slice(0, index)
        }
        clearInterval(intervalId)
        return prev
      })
    }, 300)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        src="src/assets/coffeevideo.mp4" // Replace with your actual video URL
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 bg-black bg-opacity-50 z-10"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-yellow-500 z-20 p-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {displayedText}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.2 }}
              className="inline-block ml-1"
            >
              |
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-300 font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Discover the perfect blend of flavors at Humera Cafe,
            <br /> where every cup is brewed to perfection.
            <br /> Enjoy our cozy atmosphere and delicious treats. 
          </motion.p>

          <motion.a
            href="#reservation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="bg-yellow-600 text-white font-bold px-8 py-4 rounded-full hover:bg-yellow-700 transition duration-300 transform hover:shadow-lg">
              Reserve Now
            </button>
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      />
    </div>
  )
}