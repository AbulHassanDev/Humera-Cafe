// src/Components/Advertisements.jsx
import  { useEffect, useState } from 'react';
import axios from 'axios';

const Advertisements = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('/api/ads');
        setAds(response.data);
      } catch (error) {
        console.error('Error fetching advertisements:', error);
        setError('Failed to load advertisements.');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) {
    return <div className="text-center">Loading advertisements...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {ads.map((ad) => (
        <div key={ad.id} className="bg-white p-4 rounded shadow-md cursor-pointer" onClick={(e) => e.preventDefault()}>
          <img src={ad.imageUrl} alt={ad.title} className="w-full h-32 object-cover rounded mb-2" />
          <h3 className="text-lg font-semibold">{ad.title}</h3>
          <p>{ad.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Advertisements;
