import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, Coffee, Pizza, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';
import axios from "axios";

const ReservationMap = ({ spots, onSpotClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="grid grid-cols-4 gap-4 max-w-md mx-auto mt-8"
  >
    {spots.map((spot, index) => (
      <motion.button
        key={index}
        className={`w-16 h-16 rounded-full ${
          spot ? 'bg-red-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500'
        } flex items-center justify-center text-white font-bold shadow-lg`}
        whileHover={!spot ? { scale: 1.1 } : {}}
        whileTap={!spot ? { scale: 0.95 } : {}}
        onClick={() => !spot && onSpotClick(index)}
      >
        {index + 1}
      </motion.button>
    ))}
  </motion.div>
);

ReservationMap.propTypes = {
  spots: PropTypes.arrayOf(PropTypes.bool).isRequired,
  onSpotClick: PropTypes.func.isRequired,
};

const ReservationModal = ({ isOpen, onClose, spotNumber, onConfirm }) => {
  const [orderFood, setOrderFood] = useState(false);
  const [orderDrink, setOrderDrink] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-zinc-800 rounded-lg p-6 w-full max-w-md border border-yellow-500"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-yellow-500">Reserve Spot {spotNumber}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={onConfirm} className="space-y-4">
              {['name', 'email', 'date', 'time'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-300 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : field === 'date' ? 'date' : field === 'time' ? 'time' : 'text'}
                    id={field}
                    name={field}
                    required
                    className="mt-1 block w-full rounded-md bg-zinc-700 border-transparent focus:border-yellow-500 focus:bg-zinc-600 focus:ring-0 text-white"
                  />
                </div>
              ))}
              <div className="flex items-center space-x-4">
                {[
                  { label: 'Pre-order food', state: orderFood, setState: setOrderFood, icon: Pizza },
                  { label: 'Pre-order drinks', state: orderDrink, setState: setOrderDrink, icon: Coffee },
                ].map(({ label, state, setState, icon: Icon }) => (
                  <label key={label} className="flex items-center space-x-2 text-gray-300">
                    <input
                      type="checkbox"
                      checked={state}
                      onChange={() => setState(!state)}
                      className="rounded text-yellow-500 focus:ring-yellow-500 bg-zinc-700"
                    />
                    <span>{label}</span>
                    <Icon size={20} className="text-yellow-500" />
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-400">A non-refundable reservation fee of $10 will apply.</p>
              <button type="submit" className="w-full bg-yellow-500 text-zinc-900 py-2 px-4 rounded-md hover:bg-yellow-400 transition duration-300 font-semibold">
                Confirm Reservation
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ReservationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  spotNumber: PropTypes.number.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

const Reservation = () => {
  const [showMap, setShowMap] = useState(false);
  const [spots, setSpots] = useState(Array(16).fill(false));
  const [selectedSpot, setSelectedSpot] = useState(null);

  useEffect(() => {
    const fetchSpots = async () => {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSpots(Array(16).fill(false).map(() => Math.random() > 0.7));
    };

    fetchSpots();
  }, []);

  const handleSpotClick = (index) => {
    setSelectedSpot(index);
  };

  const handleCloseModal = () => {
    setSelectedSpot(null);
  };

  const handleConfirmReservation = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Add the spot number to the reservation details
    const reservationDetails = {
      spot: selectedSpot + 1, // Adding the spot number here
      ...Object.fromEntries(formData.entries()) // Collecting other form data
    };
    
    console.log('Reservation confirmed:', reservationDetails);
    
    // Update the spot as reserved
    setSpots(spots.map((spot, i) => (i === selectedSpot ? true : spot)));
    setSelectedSpot(null);
    
    alert(`Reservation confirmed for spot ${selectedSpot + 1}! A confirmation email has been sent.`);
    
    try {
      const response = await axios.post("http://localhost:3000/api/reservations", reservationDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6 bg-zinc-900 rounded-lg shadow-lg"
    >
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 text-white"
      >
        Reserve Your <span className="text-yellow-500">Spot</span>
      </motion.h2>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex justify-center space-x-8 mb-12"
      >
        {[
          { href: "tel:+1234567890", icon: Phone, text: "+1 (234) 567-890" },
          { href: "mailto:info@humeracafe.com", icon: Mail, text: "info@humeracafe.com" },
        ].map(({ href, icon: Icon, text }) => (
          <a key={href} href={href} className="flex items-center text-gray-300 hover:text-yellow-500 transition-colors duration-300">
            <Icon size={24} className="mr-2" />
            <span>{text}</span>
          </a>
        ))}
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowMap(!showMap)}
        className="bg-yellow-500 text-zinc-900 px-8 py-4 rounded-full text-xl font-bold shadow-lg mx-auto block hover:bg-yellow-400 transition-colors duration-300"
      >
        {showMap ? 'Hide Seating Map' : 'Show Seating Map'}
      </motion.button>

      <AnimatePresence>
        {showMap && <ReservationMap spots={spots} onSpotClick={handleSpotClick} />}
      </AnimatePresence>

      <ReservationModal
        isOpen={selectedSpot !== null}
        onClose={handleCloseModal}
        spotNumber={selectedSpot !== null ? selectedSpot + 1 : null}
        onConfirm={handleConfirmReservation}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-12 text-center text-gray-400"
      >
        <Calendar className="inline-block mb-2 text-yellow-500" size={32} />
        <p>Open daily from 8:00 AM to 10:00 PM</p>
        <p>Special hours may apply on holidays</p>
      </motion.div>
    </motion.div>
  );
};

export default Reservation;