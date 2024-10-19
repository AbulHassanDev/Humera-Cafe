import  { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Load Stripe outside of a component’s render to avoid recreating the `stripe` instance on every render.
const stripePromise = loadStripe('your-publishable-key-here');

const Reservation = () => {
  const [showMap, setShowMap] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [userDetails, setUserDetails] = useState({ name: '', email: '', time: '' });
  const [order, setOrder] = useState({ food: '', drinks: '' });
  const [reservationFee] = useState(10); // Example fee
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const availableSpots = [
    { id: 1, position: { lat: 37.7749, lng: -122.4194 }, status: 'available' },
    { id: 2, position: { lat: 37.7759, lng: -122.4294 }, status: 'reserved' },
    // Add more spots as needed
  ];

  const handleReserveClick = () => {
    setShowMap(true);
  };

  const handleSpotClick = (spot) => {
    setSelectedSpot(spot);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handlePayment = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    // Replace with your own payment processing logic
    try {
      const { data } = await axios.post('/api/payment', { amount: reservationFee * 100 });
      const result = await stripe.redirectToCheckout({ sessionId: data.id });

      if (result.error) {
        console.error(result.error.message);
      } else {
        setReservationConfirmed(true);
        // Send confirmation email logic here
      }
    } catch (error) {
      console.error("Payment processing error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Reserve Your Spot</h2>
      
      <button 
        onClick={handleReserveClick} 
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        Reserve Your Spot
      </button>

      {showMap && (
        <LoadScript googleMapsApiKey="your-google-maps-api-key-here">
          <GoogleMap
            mapContainerStyle={{ height: '400px', width: '100%' }}
            center={{ lat: 37.7749, lng: -122.4194 }}
            zoom={14}
          >
            {availableSpots.map((spot) => (
              <Marker 
                key={spot.id} 
                position={spot.position} 
                onClick={() => handleSpotClick(spot)} 
                icon={{
                  url: spot.status === 'available' ? '/path-to-available-icon.png' : '/path-to-reserved-icon.png',
                  scaledSize: new window.google.maps.Size(40, 40)
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      )}

      {selectedSpot && !reservationConfirmed && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg">
          <h3 className="text-xl mb-2">Reserve Spot {selectedSpot.id}</h3>
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={userDetails.name} 
            onChange={handleInputChange} 
            className="border rounded p-2 w-full mb-2"
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={userDetails.email} 
            onChange={handleInputChange} 
            className="border rounded p-2 w-full mb-2"
          />
          <input 
            type="datetime-local" 
            name="time" 
            value={userDetails.time} 
            onChange={handleInputChange} 
            className="border rounded p-2 w-full mb-2"
          />
          <input 
            type="text" 
            name="food" 
            placeholder="Food Order" 
            value={order.food} 
            onChange={handleOrderChange} 
            className="border rounded p-2 w-full mb-2"
          />
          <input 
            type="text" 
            name="drinks" 
            placeholder="Drinks Order" 
            value={order.drinks} 
            onChange={handleOrderChange} 
            className="border rounded p-2 w-full mb-2"
          />
          <button 
            onClick={handlePayment} 
            className="bg-green-500 text-white px-6 py-2 rounded-lg transition duration-300"
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay $${reservationFee} Fee`}
          </button>
        </div>
      )}

      {reservationConfirmed && (
        <p className="mt-4 text-green-600">Your reservation has been confirmed! A confirmation email has been sent to {userDetails.email}.</p>
      )}
    </div>
  );
};

export default Reservation;
