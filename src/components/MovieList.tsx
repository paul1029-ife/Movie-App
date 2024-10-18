import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import MovieCard from './MovieCard';
import LandingPage from './LandingPage';
import API_KEY from "../assets/API_KEY"; // Ensure API_KEY is typed correctly
import { useSearch } from '../context/SearchContext';
import { AnimatePresence } from "framer-motion";
import { MovieModal } from "./MovieModal";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

const MovieList: React.FC = () => {
  const { searchTerm } = useSearch();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage: number = 20;

  // React Query to fetch data from OMDb API
  const { data, error, isLoading, refetch } = useQuery<MovieResponse, AxiosError>({
    queryKey: ["movies", searchTerm, page],
    queryFn: async ({ queryKey }) => {
      const [, searchTerm, page] = queryKey;
      if (!searchTerm) return { Search: [], totalResults: "0", Response: "False" };
      const response = await axios.get<MovieResponse>(
        `http://www.omdbapi.com/?apikey=${API_KEY as string}&s=${encodeURIComponent(
          (searchTerm as string).trim()
        )}&page=${page}`
      );
      return response.data;
    },
    enabled: Boolean(searchTerm) // Fetch only if searchTerm exists
  });

  // Refetch movies on search term change
  useEffect(() => {
    if (searchTerm) {
      setPage(1); // Reset page to 1 for new search term
      refetch();  // Refetch movies based on new search term
    }
  }, [searchTerm, refetch]);

  // Calculate total number of pages based on the results
  const totalPages: number = data?.totalResults ? Math.ceil(parseInt(data.totalResults) / itemsPerPage) : 0;

  // Handle previous page click
  const handlePrevPage = (): void => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  // Handle next page click
  const handleNextPage = (): void => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-4">
      {isLoading && <div className="text-center">Loading...</div>}
      {error && <p className="text-red-500 text-center">{error.message}</p>}
      {data?.Error && <p className="text-red-500 text-center">{data.Error}</p>}
      
      {!searchTerm && <LandingPage />} {/* Show landing page if no search term */}

      {data?.Search && data.Search.length > 0 && (
        <div>
          {/* Render the movie cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.Search.map((movie: Movie) => (
              <MovieCard
                key={movie.imdbID}
                imdbID={movie.imdbID}
                title={movie.Title}
                year={movie.Year}
                poster={movie.Poster}
                onMovieSelect={() => setSelectedMovie} // Set selected movie on click
              />
            ))}
          </div>

          {/* Show the movie modal when a movie is selected */}
          <AnimatePresence>
            {selectedMovie && (
              <MovieModal
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)} // Close modal on click
                theme={{
                  primary: "bg-blue-500",
                  secondary: "bg-gray-200",
                  text: "text-black",
                  hover: "hover:bg-blue-600",
                  gradient: "bg-gradient-to-r from-blue-400 to-blue-600"
                }} // Fixed the theme properties
              />
            )}
          </AnimatePresence>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-800 text-gray-200 rounded disabled:bg-gray-100 disabled:text-gray-400"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-800 text-gray-200 rounded disabled:bg-gray-100 disabled:text-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
