import { useState } from 'react';
import PropTypes from 'prop-types';
import h4 from '../assets/h4.jpeg';
import h8 from '../assets/h8.jpeg';
import  h1 from '../assets/h1 (1).jpeg';
import h2 from '../assets/h2.jpeg';
import h3 from '../assets/h3.jpeg';
import h5 from '../assets/h5.jpeg'

const MenuItem = ({ item, onAddToCart }) => (
  <div className="border-2 border-yellow-500 p-4 rounded-lg flex flex-col">
    <div className="overflow-hidden">
      <img
        src={item.image} // Use item.image to display the correct image
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

MenuItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

const OrderModal = ({ isOpen, onClose, item, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-950 p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-yellow-500">Order Details for {item.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Delivery Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white"
            required
          />
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white"
            required
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-1/2 p-2 rounded bg-zinc-800 text-white"
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              className="w-1/2 p-2 rounded bg-zinc-800 text-white"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
            >
              Place Order
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-zinc-700 text-white px-4 py-2 rounded hover:bg-zinc-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

OrderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  item: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

const Menu = () => {
  const mockMenuItems = [
    { id: 1, name: 'Espresso', price: 3.5, category: 'Beverages', image: h4 },
    { id: 2, name: 'Cappuccino', price: 4.5, category: 'Beverages', image: h8 },
    { id: 3, name: 'Croissant', price: 2.5, category: 'Pastries', image: h1 },
    { id: 4, name: 'Bagel', price: 3.0, category: 'Pastries', image: h2 },
    { id: 5, name: 'Latte', price: 4.0, category: 'Beverages' , image: h5 },
    { id: 6, name: 'Muffin', price: 3.0, category: 'Pastries', image: h3 },
  ];

  const [menuItems] = useState(mockMenuItems);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const addToCart = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleOrderSubmit = (formData) => {
    setCart([...cart, { ...currentItem, ...formData }]);
    setIsModalOpen(false);
    alert(`Order placed for ${currentItem.name}!`);
  };

  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="container mt-2 rounded-lg mx-auto p-6 bg-zinc-900 shadow-lg">
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

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={currentItem}
        onSubmit={handleOrderSubmit}
      />

      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4 text-yellow-500">Your Cart</h3>
        {cart.length > 0 ? (
          <ul>
            {cart.map((cartItem, index) => (
              <li key={index} className="mb-4 text-white">
                {cartItem.name} - ${cartItem.price.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
