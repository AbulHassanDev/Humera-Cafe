// src/Components/Reviews.jsx
import  { useEffect, useState } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState({ name: '', content: '' });

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setError('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Handle form submission to add a new review
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/reviews', newReview);
      setReviews((prevReviews) => [...prevReviews, response.data]);
      setNewReview({ name: '', content: '' }); // Reset the form
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Failed to submit review.');
    }
  };

  if (loading) {
    return <div className="text-center">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Your Name"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          className="border rounded p-2 w-full mb-2"
          required
        />
        <textarea
          placeholder="Your Review"
          value={newReview.content}
          onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
          className="border rounded p-2 w-full mb-2"
          rows="4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit Review
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold">{review.name}</h3>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
