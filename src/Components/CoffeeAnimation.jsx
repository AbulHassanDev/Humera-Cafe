import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CoffeeAnimation = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "eWelcome to Humera Cafe";
  
  useEffect(() => {
    let index = 0;

    const type = () => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText[index]);
        index++;
      } else {
        // Reset for looping effect
        index = 0;
        setDisplayedText('');
      }
    };

    const intervalId = setInterval(type, 300); // Adjust typing speed here (300 ms for slower typing)

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Full-Screen Coffee Video */}
      <video
        src="src/assets/coffeevideo.mp4" // Replace with the actual video URL
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Overlay for Title and Description */}
      <div className="absolute inset-0 flex flex-col items-left justify-center text-left text-yellow-500 bg-black bg-opacity-50 z-10 p-4">
        {/* Welcome Header with Typewriter Effect */}
        <h1 className="text-5xl font-bold mb-4">
          {displayedText}<span className="animate-blink">|</span> {/* Blinking cursor */}
        </h1>
        
        {/* Cafe Description */}
        <p className="text-xl mb-6">
          Discover the perfect blend of flavors at Humera Cafe,<br /> where every cup is brewed to perfection. <br /> Enjoy our cozy atmosphere and delicious treats.
        </p>
        
        {/* Reservation Button */}
        <Link to="/reservation">
          <button className="bg-yellow-500 text-black px-6 py-3 rounded-md hover:bg-yellow-600 transition duration-300">
            Reserve Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CoffeeAnimation;
