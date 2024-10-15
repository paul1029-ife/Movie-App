import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-blue-500 transition-colors duration-300">
            MovieSearch
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="space-x-4 hidden md:flex">
          <Link to="/" className="hover:text-blue-500 transition-colors duration-300">
            Home
          </Link>
          <Link to="/popular" className="hover:text-blue-500 transition-colors duration-300">
            Popular
          </Link>
          <Link to="/favorites" className="hover:text-blue-500 transition-colors duration-300">
            Favorites
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button className="focus:outline-none">
            {/* Hamburger Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

