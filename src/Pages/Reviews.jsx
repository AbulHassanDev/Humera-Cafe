import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Quote } from 'lucide-react'



const ReviewCard =  ({ content, name, delay }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
      }}
      className="bg-zinc-900 text-white p-8 rounded-lg shadow-lg border border-yellow-600 hover:border-yellow-500 transition-colors duration-300"
    >
      <Quote className="text-yellow-500 w-12 h-12 mb-6" />
      <p className="mb-6 text-gray-300 leading-relaxed">{content}</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-yellow-600 flex items-center justify-center text-zinc-900 font-bold text-xl mr-4">
          {name.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-yellow-500">{name}</h3>
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Reviews = () => {
  const reviewsData = [
    {
      id: 1,
      content: "Humera Cafe is truly a hidden gem! The atmosphere is cozy and welcoming, perfect for enjoying a cup of coffee with friends or getting some work done. The coffee is brewed to perfection, with a rich flavor that stands out from other cafes. Their pastries are fresh and delicious, adding the perfect touch to the experience. The staff is friendly and always goes above and beyond to ensure customers feel at home. I highly recommend this place for anyone looking for a quality cafe experience.",
      name: "John Doe",
    },
    {
      id: 2,
      content: "Humera Cafe exceeded all my expectations! From the moment I walked in, I was greeted with a warm, inviting atmosphere. The aroma of freshly brewed coffee was just heavenly. I tried the cappuccino, and it was one of the best I've ever had—smooth, rich, and perfectly balanced. The pastries are to die for; the croissant was flaky and buttery, just the way I like it. The staff were friendly and attentive, making the experience even more enjoyable. This is definitely my new go-to spot for coffee and a quick bite.",
      name: "Jane Smith",
    },
    {
      id: 3,
      content: "I can't say enough good things about Humera Cafe! The ambiance is perfect for both casual meetups and focused work sessions. Their coffee selection is impressive, and each cup is crafted with care. I'm particularly fond of their seasonal specials – they always manage to surprise me with unique and delicious flavors. The food menu, though concise, offers a variety of tasty options that complement the drinks perfectly. The staff's knowledge and passion for coffee shine through in every interaction. Humera Cafe has become my favorite spot in town!",
      name: "Alice Johnson",
    },
  ]

  return (
    <div className="bg-zinc-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          CUSTOMERS <span className="text-yellow-500">REVIEW</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsData.map((review, index) => (
            <ReviewCard
              key={review.id}
              content={review.content}
              name={review.name}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reviews