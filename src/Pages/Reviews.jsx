import PropTypes from 'prop-types';

const ReviewCard = ({ content, name = "Anonymous" }) => (
  <div className="bg-zinc-950 text-white p-6 rounded-lg shadow-lg border-2 border-yellow-500">
    <div className="text-6xl text-yellow-500 mb-4">
      {/* Optional content or icon here */}
    </div>
    <p className="mb-4 text-sm">{content}</p>
    <div className="flex items-center">
      <img
        src="src/assets/jon.webp"
        alt={name}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex text-yellow-500">
          ★★★★★
        </div>
      </div>
    </div>
  </div>
);

// Prop validation for ReviewCard component
ReviewCard.propTypes = {
  content: PropTypes.string.isRequired,
  name: PropTypes.string,
};

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
      content: "Humera Cafe exceeded all my expectations! From the moment I walked in, I was greeted with a warm, inviting atmosphere. The aroma of freshly brewed coffee was just heavenly. I tried the cappuccino, and it was one of the best I've ever had—smooth, rich, and perfectly balanced. The pastries are to die for; the croissant was flaky and buttery, just the way I like it. The staff were friendly and attentive, making the experience even more enjoyable. This is definitely my new go-to spot for coffee and a quick bite.",
      name: "Alice Johnson",
    },
  ];

  return (
    <> 
      <div className="container mx-auto p-6 bg-black">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          CUSTOMERS <span className="text-yellow-500">REVIEW</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsData.map((review) => (
            <ReviewCard key={review.id} content={review.content} name={review.name} />
          ))}
        </div>
      </div>
      <br />
    </>
  );
};

export default Reviews;
