import React, { useRef, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

const Header: React.FC = () => {
  const { searchTerm, setSearchTerm, handleSearch } = useSearch();
  const [isOpened, setIsOpened] = useState(false);
  const focusSearch = useRef(null);
  const navigate = useNavigate();

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div>
      <header className="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto">
          {/* Top Bar - Logo and Menu Button */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl font-bold">
              <Link
                to="/"
                className="hover:text-blue-500 transition-colors duration-300"
              >
                MovieSearch
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              onClick={() => setIsOpened(!isOpened)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpened ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Search Bar - Full width on mobile */}
          <form onSubmit={onSearchSubmit} className="w-full mb-4">
            <div className="flex">
              <input
                type="text"
                ref={focusSearch}
                onFocus={() => navigate("/")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for movies..."
                className="px-4 py-2 rounded-l-lg text-black w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 justify-center">
            <Link
              to="/"
              className="hover:text-blue-500 transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/popular"
              className="hover:text-blue-500 transition-colors duration-300 font-medium"
            >
              Popular
            </Link>
            <Link
              to="/favorites"
              className="hover:text-blue-500 transition-colors duration-300 font-medium"
            >
              Favorites
            </Link>
          </nav>

          {/* Mobile Navigation Menu */}
          <div
            className={`md:hidden absolute left-0 right-0 bg-gray-900 shadow-lg transition-all duration-300 ease-in-out ${
              isOpened ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            style={{ top: "100%" }}
          >
            <nav className="container mx-auto py-2">
              <Link
                to="/"
                className="block py-3 px-4 hover:bg-gray-800 transition-colors duration-300"
                onClick={() => setIsOpened(false)}
              >
                Home
              </Link>
              <Link
                to="/popular"
                className="block py-3 px-4 hover:bg-gray-800 transition-colors duration-300"
                onClick={() => setIsOpened(false)}
              >
                Popular
              </Link>
              <Link
                to="/favorites"
                className="block py-3 px-4 hover:bg-gray-800 transition-colors duration-300"
                onClick={() => setIsOpened(false)}
              >
                Favorites
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
