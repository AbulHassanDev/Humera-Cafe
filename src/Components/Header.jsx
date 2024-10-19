import { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Turkey Panini", price: 8.75, quantity: 1 }
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ).filter(item => item.quantity > 0));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="bg-zinc-950">
        <div className="flex items-center py-6 justify-around">
          {/* Logo Section */}
          <div className="flex items-center">
            <img src="src/assets/logo.svg" alt="logo" className="h-10 w-10 mr-2" />
          </div>

          {/* Icons Section (Visible on all screen sizes) */}
          <div className="flex items-center space-x-4 text-white md:hidden">
            <IoSearchOutline className="text-xl cursor-pointer" onClick={toggleSearch} />
            <div className="relative">
              <FaShoppingCart className="text-xl cursor-pointer" onClick={toggleCart} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </div>
            <div className="text-2xl cursor-pointer" onClick={toggleMenu}>
              {isMenuOpen ? <MdClose /> : <GiHamburgerMenu />}
            </div>
          </div>

          {/* Navigation Links for Larger Screens */}
          <ul className="hidden md:flex space-x-4 text-white text-lg font-sans xl:gap-10 md:gap-0 sm:gap-0">
            <li><Link to="/" className="hover:text-yellow-500 hover:underline hover:underline-offset-4 hover:decoration-yellow-500 transition-all duration-400">Home</Link></li>
            <li><Link to="/menu" className="hover:text-yellow-500 hover:underline hover:underline-offset-4 hover:decoration-yellow-500 transition-all duration-400">Menu</Link></li>
            <li><Link to="/reservation" className="hover:text-yellow-500 hover:underline hover:underline-offset-4 hover:decoration-yellow-500 transition-all duration-400">Reservation</Link></li>
            <li><Link to="/reviews" className="hover:text-yellow-500 hover:underline hover:underline-offset-4 hover:decoration-yellow-500 transition-all duration-400">Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-500 hover:underline hover:underline-offset-4 hover:decoration-yellow-500 transition-all duration-400">Contact</Link></li>
          </ul>

          {/* Icons Section for Larger Screens */}
          <div className="hidden md:flex items-center space-x-6 text-white">
            <IoSearchOutline className="text-2xl cursor-pointer hover:text-yellow-500 transition-all duration-400" onClick={toggleSearch} />
            <div className="relative">
              <FaShoppingCart className="text-2xl cursor-pointer hover:text-yellow-500 transition-all duration-400" onClick={toggleCart} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="flex flex-col mt-2 space-y-2 text-white text-sm md:hidden">
            <Link to="/" className="hover:text-yellow-500" onClick={toggleMenu}>Home</Link>
            <Link to="/menu" className="hover:text-yellow-500" onClick={toggleMenu}>Menu</Link>
            <Link to="/reservation" className="hover:text-yellow-500" onClick={toggleMenu}>Reservation</Link>
            <Link to="/reviews" className="hover:text-yellow-500" onClick={toggleMenu}>Reviews</Link>
            <Link to="/contact" className="hover:text-yellow-500" onClick={toggleMenu}>Contact</Link>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-0 left-0 w-full bg-zinc-800 p-4 z-50">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-700 text-white p-2 pr-10 rounded"
              />
              <MdClose
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                onClick={() => {
                  setSearchQuery("");
                  toggleSearch();
                }}
              />
            </div>
          </div>
        )}

        {/* Shopping Cart */}
        {isCartOpen && (
          <div className="absolute top-0 right-0 w-full md:w-96 bg-zinc-800 p-4 z-50">
            <h2 className="text-white text-xl mb-4">Your cart ({totalItems})</h2>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center mb-4 text-white">
                <div>
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => updateQuantity(item.id, -1)} className="bg-gray-700 px-2 py-1 rounded">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="bg-gray-700 px-2 py-1 rounded">+</button>
                </div>
              </div>
            ))}
            <div className="text-white mt-4">
              <p>Total: ${totalPrice.toFixed(2)}</p>
              <button className="bg-yellow-500 text-black w-full py-2 mt-4 rounded">Continue to cart ${totalPrice.toFixed(2)}</button>
            </div>
            <button onClick={toggleCart} className="text-white mt-4">Close</button>
          </div>
        )}
      </div>
      <hr className="text-orange-700"/>
    </>
  );
}