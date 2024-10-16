import React from 'react';
import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import API_KEY from "../assets/API_KEY";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const popularMovieTitles = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Dark Knight",
  "Pulp Fiction",
  "Forrest Gump",
  "Inception",
  "Goodfellas",
  "The Matrix",
  "Schindler's List",
  "Star Wars: Episode IV - A New Hope",
  "The Lord of the Rings: The Fellowship of the Ring",
  "Fight Club"
];

const fetchMovie = async (title: string): Promise<Movie> => {
  const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY as string}&t=${encodeURIComponent(title)}`);
  if (response.data.Response === "False") {
    throw new Error(response.data.Error);
  }
  return response.data;
};

const PopularMovies: React.FC = () => {
  const movieQueries = useQueries({
    queries: popularMovieTitles.map(title => ({
      queryKey: ['movie', title],
      queryFn: () => fetchMovie(title),
      staleTime: Infinity, // These popular movies don't change often, so we can cache them for a long time
    })),
  });

  const isLoading = movieQueries.some(query => query.isLoading);
  const isError = movieQueries.some(query => query.isError);
  const errors = movieQueries.filter(query => query.error).map(query => query.error);

  if (isLoading) {
    return <div className="text-center py-10">Loading popular movies...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading movies:
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{(error as Error).message}</li>
          ))}
        </ul>
      </div>
    );
  }

  const movies = movieQueries
    .filter(query => query.data)
    .map(query => query.data as Movie);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Popular Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            imdbID={movie.imdbID}
            title={movie.Title}
            year={movie.Year}
            poster={movie.Poster}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;