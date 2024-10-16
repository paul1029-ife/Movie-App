import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

const Header: React.FC = () => {
  const { searchTerm, setSearchTerm, handleSearch } = useSearch();
  
  const navigate = useNavigate()
  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div>
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold mb-4 md:mb-0">
            <Link
              to="/"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              MovieSearch
            </Link>
          </div>

          {/* Search Input */}
          <form
            onSubmit={onSearchSubmit}
            className="flex mb-4 md:mb-0 w-full md:w-auto"
          >
            <input
              type="text"
              onFocus={() => navigate("/")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for movies..."
              className="px-2 py-1 rounded-l text-black flex-grow md:w-64"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded-r hover:bg-blue-600 transition-colors duration-300"
            >
              Search
            </button>
          </form>

          {/* Navigation Links */}
          <nav className="space-x-4 hidden md:flex">
            <Link
              to="/"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/popular"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Popular
            </Link>
            <Link
              to="/favorites"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Favorites
            </Link>
          </nav>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button className="focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Header;
