import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import MovieCard from './MovieCard';  // Make sure this path is correct
import API_KEY from "../assets/API_KEY";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const itemsPerPage: number = 20;

  const { data, error, isLoading, refetch } = useQuery<MovieResponse, AxiosError>({
    queryKey: ["movies", searchTerm, page],
    queryFn: async ({ queryKey }) => {
      const [, searchTerm, page] = queryKey;
      if (!searchTerm) return { Search: [], totalResults: "0", Response: "False", Error: "No search term provided" };
      const response = await axios.get<MovieResponse>(
        `http://www.omdbapi.com/?apikey=${API_KEY as string}=${encodeURIComponent(
          searchTerm as string
        )}&page=${page}`
      );
      return response.data;
    },
    enabled: false 
  });

  const totalPages: number = data?.totalResults ? Math.ceil(parseInt(data.totalResults) / itemsPerPage) : 0;

  // Refetch data when the page changes
  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [page, refetch]);

  const handleSearch = (): void => {
    setPage(1);
    refetch();
  };

  const handlePrevPage = (): void => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = (): void => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
          className="mr-2 flex-grow px-2 py-1 border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-4 py-1 bg-gray-800 text-white rounded disabled:bg-blue-300"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {isLoading && <div className="text-center">Loading...</div>}
      {error && <p className="text-red-500 text-center">{error.message}</p>}
      {data?.Error && <p className="text-red-500 text-center">{data.Error}</p>}

      {data?.Search && data.Search.length > 0 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.Search.map((movie: Movie) => (
              <MovieCard
                key={movie.imdbID}
                title={movie.Title}
                year={movie.Year}
                poster={movie.Poster}
              />
            ))}
          </div>

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
