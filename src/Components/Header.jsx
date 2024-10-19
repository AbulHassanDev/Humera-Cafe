import { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
    <div className="bg-zinc-900  ">
      <div className="flex items-center py-6 justify-around">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src="src/assets/logo.svg" alt="logo" className="h-10 w-10 mr-2 " />
        </div>

        {/* Icons Section (Visible on all screen sizes) */}
        <div className="flex items-center space-x-4 text-white md:hidden">
          <IoSearchOutline className="text-xl cursor-pointer" />
          <FaShoppingCart className="text-xl cursor-pointer" />
          
          {/* Hamburger Menu Button (visible on small screens) */}
          <div className="text-2xl cursor-pointer" onClick={toggleMenu}>
            {isMenuOpen ? <MdClose /> : <GiHamburgerMenu />}
          </div>
        </div>

        {/* Navigation Links for Larger Screens */}
        <ul className="hidden md:flex space-x-4 text-white text-lg font-sans xl:gap-10 md:gap-0 sm:gap-0">
          <li className="shadow-lg">
            <Link to="/" className="hover:text-yellow-500 hover:underline hover:underline-offset-4 hover:decoration-yellow-500 transition-all duration-400">Home</Link>
          </li>
          
          <li>
            <Link to="/menu" className="hover:text-yellow-500 hover:underline hover:underline-offset-4 hover:decoration-yellow-500 transition-all duration-400">Menu</Link>
          </li>
          <li>
            <Link to="/reservation" className="hover:text-yellow-500 hover:underline hover:underline-offset-4 hover:decoration-yellow-500 transition-all duration-400">Reservation</Link>
          </li>
          <li>
            <Link to="/review" className="hover:text-yellow-500 hover:underline hover:underline-offset-4 hover:decoration-yellow-500 transition-all duration-400">Review</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-500 hover:underline hover:underline-offset-4 hover:decoration-yellow-500 transition-all duration-400">Contact</Link>
          </li>
          
        </ul>

        {/* Icons Section for Larger Screens */}
        <div className="hidden md:flex items-center space-x-6 text-white">
          <IoSearchOutline className="text-2xl cursor-pointer hover:text-yellow-500 hover:underline hover:underline-offset-4 hover:decoration-yellow-500 transition-all duration-400" />
          <FaShoppingCart className="text-2xl cursor-pointer hover:text-yellow-500 hover:underline hover:underline-offset-4 hover:decoration-yellow-500 transition-all duration-400" />
        </div>
      </div>

      {/* Mobile Menu (Visible when menu is open) */}
      {isMenuOpen && (
        <div className="flex flex-col mt-2 space-y-2 text-white text-sm md:hidden">
          <Link to="/" className="hover:text-yellow-500" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/about" className="hover:text-yellow-500" onClick={toggleMenu}>
            About
          </Link>
          <Link to="/menu" className="hover:text-yellow-500" onClick={toggleMenu}>
            Menu
          </Link>
          <Link to="/reservation" className="hover:text-yellow-500" onClick={toggleMenu}>
          Reservation
          </Link>
          <Link to="/review" className="hover:text-yellow-500" onClick={toggleMenu}>
            Review
          </Link>
          <Link to="/contact" className="hover:text-yellow-500" onClick={toggleMenu}>
            Contact
          </Link>
         
        </div>
      )}
    </div>

   
   <hr className="text-orange-700"/>
    </>
    
  );
};

export default Header;
