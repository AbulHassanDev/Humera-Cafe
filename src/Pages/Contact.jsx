import { useState } from 'react'
import { Phone, Mail, Calendar, MapPin } from 'lucide-react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const contactInfo = {
    phone: '+1 (555) 123-4567',
    email: 'contact@humercafe.com',
    address: '123 Cafe Street, Foodville, FC 12345',
    reservationFee: 'The reservation fee is $10, non-refundable.'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', { name, email, message })
    alert('Thank you for your message! We will get back to you soon.')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="max-w-[1400px] mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-zinc-900">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">
        Contact <span className="text-yellow-600">Us</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          {[
            { icon: Phone, text: contactInfo.phone, href: `tel:${contactInfo.phone}` },
            { icon: Mail, text: contactInfo.email, href: `mailto:${contactInfo.email}` },
            { icon: MapPin, text: contactInfo.address },
            { icon: Calendar, text: contactInfo.reservationFee },
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-4 text-gray-300">
              <item.icon className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              {item.href ? (
                <a href={item.href} className="hover:text-yellow-600 transition-colors duration-300">
                  {item.text}
                </a>
              ) : (
                <span>{item.text}</span>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { id: 'name', label: 'Name', type: 'text', value: name, onChange: setName },
            { id: 'email', label: 'Email', type: 'email', value: email, onChange: setEmail },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-300 mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                required
                className="w-full px-4 py-3 bg-zinc-800 border-2 border-yellow-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors duration-300"
              />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-3 bg-zinc-800 border-2 border-yellow-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors duration-300"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-600 text-zinc-900 py-3 px-6 rounded-md text-lg font-semibold hover:bg-yellow-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}