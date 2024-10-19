import { useState } from 'react';
import PropTypes from 'prop-types';
import h1 from '../assets/h1 (1).jpeg';
import h2 from '../assets/h1 (1).jpeg';
import h8 from '../assets/h8.jpeg';
import h3 from '../assets/h3.jpeg';
import h5 from '../assets/h5.jpeg';

// MenuItem component with hover zoom effect
const MenuItem = ({ item, onAddToCart }) => (
  <div className="border-2 border-yellow-500 p-4 rounded-lg flex flex-col">
    <div className="overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 rounded-lg object-cover mb-4 cursor-pointer transform transition-transform duration-500 hover:scale-110"
      />
    </div>
    <h3 className="text-white text-lg ml-3 font-semibold mb-2">{item.name}</h3>
    <div className="flex justify-around gap-10">
      <p className="text-yellow-500 text-xl font-bold mb-2">${item.price.toFixed(2)}</p>
      <p className="text-gray-400 line-through text-sm mb-4">${(item.price * 1.25).toFixed(2)}</p>
      <button
        onClick={() => onAddToCart(item)}
        className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
      >
        Add To Cart
      </button>
    </div>
  </div>
);

// PropTypes validation for MenuItem
MenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

const Menu = () => {
  // Mock data for menu items
  const mockMenuItems = [
    {
      id: 1,
      name: 'Espresso',
      price: 3.5,
      image: h1,
      category: 'Beverages',
    },
    {
      id: 2,
      name: 'Cappuccino',
      price: 4.5,
      image: h2,
      category: 'Beverages',
    },
    {
      id: 3,
      name: 'Croissant',
      price: 2.5,
      image: h8,
      category: 'Pastries',
    },
    {
      id: 4,
      name: 'Bagel',
      price: 3.0,
      image: h3,
      category: 'Pastries',
    },
    {
      id: 5,
      name: 'Latte',
      price: 4.0,
      image: h5,
      category: 'Beverages',
    },
    {
      id: 6,
      name: 'Latte',
      price: 4.0,
      image: h5,
      category: 'Pastries',
    },
  ];

  const [menuItems, setMenuItems] = useState(mockMenuItems);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(`Added ${item.name} to cart!`);
  };

  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="container mt-2 rounded-lg mx-auto  p-6 bg-zinc-900 shadow-lg">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">
        OUR <span className="text-yellow-500">MENU</span>
      </h2>

      {Object.entries(groupedMenu).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-yellow-500">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <MenuItem key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
