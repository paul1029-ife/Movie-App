import React, { useState, useCallback } from "react";
import axios from "axios";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
}

interface MovieListProps {
  searchTerm: string;
}

const MovieList: React.FC<MovieListProps> = ({ searchTerm }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(() => {
    setLoading(true);
    setError(null);
    axios.get(`http://www.omdbapi.com/?apikey=9c7c70c3&s=${encodeURIComponent(searchTerm)}`)
      .then((res) => {
        if (res.data.Response === "True") {
          setMovies(res.data.Search);
        } else {
          setError(res.data.Error || "No movies found");
        }
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  return (
    <div>
      <button onClick={fetchMovies} disabled={loading}>
        {loading ? "Fetching..." : "Fetch movies"}
      </button>
      {loading && <div>Loading...</div>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {movies.length > 0 && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.imdbID}>{movie.Title} ({movie.Year})</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieList;