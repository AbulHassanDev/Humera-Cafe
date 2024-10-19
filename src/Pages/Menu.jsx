import { useState } from 'react';
import PropTypes from 'prop-types';

// MenuItem component with prop validation
const MenuItem = ({ item, onAddToCart }) => (
  <div className="border-2 border-yellow-500 p-4 rounded-lg flex flex-col items-center">
    <img src={item.image} alt={item.name} className="w-32 h-32 object-cover mb-4" />
    <h3 className="text-white text-lg font-semibold mb-2">{item.name}</h3>
    <p className="text-yellow-500 text-xl font-bold mb-2">${item.price.toFixed(2)}</p>
    <p className="text-gray-400 line-through text-sm mb-4">${(item.price * 1.25).toFixed(2)}</p>
    <button
      onClick={() => onAddToCart(item)}
      className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
    >
      Add To Cart
    </button>
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
      image: 'https://via.placeholder.com/150',
      category: 'Beverages',
    },
    {
      id: 2,
      name: 'Cappuccino',
      price: 4.5,
      image: 'https://via.placeholder.com/150',
      category: 'Beverages',
    },
    {
      id: 3,
      name: 'Croissant',
      price: 2.5,
      image: 'https://via.placeholder.com/150',
      category: 'Pastries',
    },
    {
      id: 4,
      name: 'Bagel',
      price: 3.0,
      image: 'https://via.placeholder.com/150',
      category: 'Pastries',
    },
    {
      id: 5,
      name: 'Latte',
      price: 4.0,
      image: 'https://via.placeholder.com/150',
      category: 'Beverages',
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
    <div className="container mx-auto p-6 bg-black">
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
