import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import MovieCard from './MovieCard';
import API_KEY from "../assets/API_KEY";
import { useSearch } from '../context/SearchContext';

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
  const [page, setPage] = useState<number>(1);
  const itemsPerPage: number = 20;

  const { data, error, isLoading, refetch } = useQuery<MovieResponse, AxiosError>({
    queryKey: ["movies", searchTerm, page],
    queryFn: async ({ queryKey }) => {
      const [, searchTerm, page] = queryKey;
      if (!searchTerm) return { Search: [], totalResults: "0", Response: "False", Error: "No search term provided" };
      const response = await axios.get<MovieResponse>(
        `http://www.omdbapi.com/?apikey=${API_KEY as string}&s=${encodeURIComponent(
          searchTerm as string
        )}&page=${page}`
      );
      return response.data;
    },
    enabled: Boolean(searchTerm)
  });

  useEffect(() => {
    if (searchTerm) {
      setPage(1);
      refetch();
    }
  }, [searchTerm, refetch]);

  const totalPages: number = data?.totalResults ? Math.ceil(parseInt(data.totalResults) / itemsPerPage) : 0;

  const handlePrevPage = (): void => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = (): void => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-4">
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