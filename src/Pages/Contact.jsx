import { useState } from 'react';
import { Phone, Mail, Calendar, MapPin } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const contactInfo = {
    phone: '+1 (555) 123-4567',
    email: 'contact@humercafe.com',
    address: '123 Cafe Street, Foodville, FC 12345',
    reservationFee: 'The reservation fee is $10, non-refundable.'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, message });
    alert('Thank you for your message! We will get back to you soon.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container mx-auto p-6 bg-gradient-to-br from-zinc-950  rounded-lg shadow-lg mt-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-white">Contact <span className='text-orange-600'>Us</span> </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-4 text-gray-100">
            <Phone className="w-6 h-6 text-primary" />
            <a href={`tel:${contactInfo.phone}`} className="hover:text-primary transition-colors duration-300">
              {contactInfo.phone}
            </a>
          </div>
          <div className="flex items-center space-x-4 text-gray-100">
            <Mail className="w-6 h-6 text-primary" />
            <a href={`mailto:${contactInfo.email}`} className="hover:text-primary transition-colors duration-300">
              {contactInfo.email}
            </a>
          </div>
          <div className="flex items-center space-x-4 text-gray-100">
            <MapPin className="w-6 h-6 text-primary" />
            <span>{contactInfo.address}</span>
          </div>
          <div className="flex items-start space-x-4 text-gray-100">
            <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <p>{contactInfo.reservationFee}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm  font-medium text-gray-100 mb-1">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border-4 border-orange-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-100 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border-4 border-orange-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-100 mb-1">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="4"
              className="w-full px-3 py-2 border-4 border-orange-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-500 text-white py-2 px-4 rounded-md hover:bg-zinc-800 transition-colors duration-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
