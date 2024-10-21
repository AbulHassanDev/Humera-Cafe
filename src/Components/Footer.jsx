import  { useState } from 'react';
import { FaXTwitter } from "react-icons/fa6";
import { RiFacebookCircleLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io5";
import { SiTiktok } from "react-icons/si";
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FaPinterest } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup logic here
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-black font-sans py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-yellow-500">ABOUT US</h2>
            <p className="text-gray-300 mb-4">Humera Cafe offers a unique blend of flavors and ambiance, serving the best coffee and pastries in town since 2010.</p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-yellow-500">QUICK LINKS</h2>
            <ul className="text-gray-300 space-y-2">
              <li><Link to="/" className="hover:text-yellow-500 transition duration-300">Home</Link></li>
              <li><Link to="/menu" className="hover:text-yellow-500 transition duration-300">Menu</Link></li>
              <li><Link to="/reservation" className="hover:text-yellow-500 transition duration-300">Reservation</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-500 transition duration-300">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-yellow-500">CONTACT US</h2>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-yellow-500" />
                301 Basin Street, Suite 1, New Orleans, LA 70112
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-yellow-500" />
                (504)-372-4442
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-yellow-500" />
                info@backatownnola.com
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-yellow-500">NEWSLETTER</h2>
            <p className="text-gray-300 mb-4">Stay updated with our latest offers and events!</p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <button type="submit" className="bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-yellow-600 transition duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        

        {/* Hours Section */}
        <div className="mt-8 text-left">
          <h2 className="text-xl font-bold mb-4 text-yellow-500">HOURS</h2>
          <p className="text-gray-300">Monday - Friday: 7AM - 8PM</p>
          <p className="text-gray-300">Saturday - Sunday: 8AM - 9PM</p>
          <p className="text-gray-300 mt-2">Closing at 1PM for Christmas Eve. Closed for Christmas.</p>
        </div>

        {/* Social Media Links */}
        <div className=" text-center">
          <h2 className="text-xl font-bold mb-4 text-yellow-500">FIND US ON...</h2>
          <div className="flex justify-center space-x-4">
            <Link to="#" className="hover:text-gray-300 transition duration-300">
              <FaXTwitter size={24} className="text-blue-400 hover:text-gray-300" />
            </Link>
            <Link to="Facebook.com/humeracaffe" className="hover:text-blue-600 transition duration-300">
              <RiFacebookCircleLine size={24} className="text-blue-600 hover:text-blue-800" />
            </Link>
            <Link to="#" className="hover:text-purple-700 transition duration-300">
              <IoLogoInstagram size={24} className="text-pink-500 hover:text-purple-700" />
            </Link>
            <Link to="#" className="hover:text-yellow-300 transition duration-300">
              <SiTiktok size={24} className="text-white hover:text-yellow-300" />
            </Link>
            <Link to="https://www.pinterest.com/humeracaffe/" className="hover:text-yellow-300 transition duration-300">
              <FaPinterest  size={24} className="text-white hover:text-yellow-300" />
            </Link>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        {/* Footer Bottom Section */}
        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Humera Cafe. All rights reserved.</p>
          <div className="mt-2">
            <Link to="/privacy" className="hover:text-yellow-500 transition duration-300 mr-4">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-yellow-500 transition duration-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;