import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Mail, Coffee, Pizza } from 'lucide-react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const ReservationMap = ({ spots, onSpotClick }) => (
  <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mt-8">
    {spots.map((spot, index) => (
      <motion.button
        key={index}
        className={`w-16 h-16 rounded-full ${
          spot ? 'bg-red-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
        } flex items-center justify-center text-white font-bold`}
        whileHover={!spot ? { scale: 1.1 } : {}}
        whileTap={!spot ? { scale: 0.95 } : {}}
        onClick={() => !spot && onSpotClick(index)}
      >
        {index + 1}
      </motion.button>
    ))}
  </div>
);

// PropTypes validation for ReservationMap component
ReservationMap.propTypes = {
  spots: PropTypes.arrayOf(PropTypes.bool).isRequired, // Array of booleans for spot availability
  onSpotClick: PropTypes.func.isRequired, // Function to handle spot click events
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
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Reserve Spot {spotNumber}</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={onConfirm} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" id="date" name="date" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50" />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                <input type="time" id="time" name="time" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50" />
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={orderFood}
                    onChange={() => setOrderFood(!orderFood)}
                    className="rounded text-yellow-500 focus:ring-yellow-500"
                  />
                  <span>Pre-order food</span>
                  <Pizza size={20} className="text-gray-500" />
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={orderDrink}
                    onChange={() => setOrderDrink(!orderDrink)}
                    className="rounded text-yellow-500 focus:ring-yellow-500"
                  />
                  <span>Pre-order drinks</span>
                  <Coffee size={20} className="text-gray-500" />
                </label>
              </div>
              <p className="text-sm text-gray-500">A non-refundable reservation fee of $10 will apply.</p>
              <button type="submit" className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300">
                Confirm Reservation
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// PropTypes validation for ReservationModal component
ReservationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Boolean to control modal visibility
  onClose: PropTypes.func.isRequired, // Function to close the modal
  spotNumber: PropTypes.number.isRequired, // The number of the selected spot
  onConfirm: PropTypes.func.isRequired, // Function to handle reservation confirmation
};

const Reservation = () => {
  const [showMap, setShowMap] = useState(false);
  const [spots, setSpots] = useState(Array(16).fill(false));
  const [selectedSpot, setSelectedSpot] = useState(null);

  useEffect(() => {
    // Fetch spots from the backend
    const fetchSpots = async () => {
      try {
        const response = await fetch('/api/spots'); // Adjust the URL to match your backend
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSpots(data.spots); // Assuming the response structure has "spots" key
      } catch (error) {
        console.error('Failed to fetch spots:', error);
      }
    };

    fetchSpots();
  }, []);

  const handleSpotClick = (index) => {
    setSelectedSpot(index);
  };

  const handleCloseModal = () => {
    setSelectedSpot(null);
  };

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reservationDetails = Object.fromEntries(formData.entries());
    console.log('Reservation confirmed:', { spot: selectedSpot + 1, ...reservationDetails });
    setSpots(spots.map((spot, i) => (i === selectedSpot ? true : spot)));
    setSelectedSpot(null);
    alert(`Reservation confirmed for spot ${selectedSpot + 1}! A confirmation email has been sent.`);
    // Here you would typically send the reservation to the backend
  };

  return (
    <div className="container mx-auto p-6 bg-zinc-900 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-100">
        Reserve Your <span className="text-yellow-500">Spot</span>
      </h2>

      <div className="flex justify-center space-x-4 mb-8">
        <a href="tel:+1234567890" className="flex items-center text-gray-300 hover:text-yellow-500">
          <Phone size={20} className="mr-2" />
          <span>+1 (234) 567-890</span>
        </a>
        <a href="mailto:info@humeracafe.com" className="flex items-center text-gray-300 hover:text-yellow-500">
          <Mail size={20} className="mr-2" />
          <span>info@humeracafe.com</span>
        </a>
      </div>

      <button
        onClick={() => setShowMap(!showMap)}
        className={`bg-yellow-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg mx-auto block ${showMap ? 'hover:bg-yellow-600' : 'hover:bg-yellow-600'}`}
      >
        {showMap ? 'Hide Seating Map' : 'Show Seating Map'}
      </button>

      {showMap && (
        <ReservationMap spots={spots} onSpotClick={handleSpotClick} />
      )}

      {selectedSpot !== null && (
        <ReservationModal
          isOpen={selectedSpot !== null}
          onClose={handleCloseModal}
          spotNumber={selectedSpot + 1}
          onConfirm={handleConfirmReservation}
        />
      )}
    </div>
  );
};

export default Reservation;
