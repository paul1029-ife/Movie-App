import React, { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { Movie, SortOption } from "../types/movie";
import { GENRE_THEMES } from "../constants/theme";
import { MOVIES_BY_GENRE } from "../constants/data";
import { fetchMovie } from "../utils/api";
import { MovieModal } from "../components/MovieModal";
import { SearchBar } from "../components/SearchBar";
import { SortControls } from "../components/SortControls";
import { GenreFilter } from "../components/GenreFilter";
import { GenreSection } from "../components/GenreSection";
import { filterMovies, sortMovies } from "../utils/sorting"; // Helper functions to filter and sort movies

const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // Fetch movies using react-query
  const movieQueries = useQueries({
    queries: Object.values(MOVIES_BY_GENRE)
      .flat()
      .map((title) => ({
        queryKey: ["movie", title],
        queryFn: () => fetchMovie(title),
        staleTime: Infinity,
      })),
  });

  // Handle loading and error states
  const isLoading = movieQueries.some((query) => query.isLoading);
  const isError = movieQueries.some((query) => query.isError);
  const movies = movieQueries
    .map((query) => query.data)
    .filter(Boolean) as Movie[];

  if (isLoading)
    return (
      <div className="text-center w-full h-[100vh] flex justify-center items-center font-bold text-3xl ">
        Loading<span className="animate-pulse">...</span>
      </div>
    );
  if (isError) return <div>Error loading movies.</div>;

  // Filter and sort movies based on selected genre and search query
  const filteredMovies = filterMovies(movies, searchQuery, selectedGenre);
  const sortedMovies = sortMovies(filteredMovies, sortBy);

  // Determine genres to display (if selectedGenre is null, display all)
  const genresToShow = selectedGenre
    ? [selectedGenre]
    : Object.keys(MOVIES_BY_GENRE);

  return (
    <>
      <div className="container mx-auto p-4 space-y-8">
        {/* Header Controls */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <SortControls currentSort={sortBy} onSortChange={setSortBy} />
        <GenreFilter
          genres={Object.keys(MOVIES_BY_GENRE)}
          selectedGenre={selectedGenre}
          onGenreSelect={setSelectedGenre}
          themes={GENRE_THEMES}
        />

        {/* Genre Sections */}
        <AnimatePresence>
          {genresToShow.map((genre) => (
            <GenreSection
              genre={genre}
              movies={sortedMovies.filter((movie) => MOVIES_BY_GENRE[genre].includes(movie.Title)
              )}
              onMovieSelect={setSelectedMovie}
              sortBy={sortBy} 
                     />
          ))}
        </AnimatePresence>
      </div>

      {/* Movie Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            theme={
              selectedGenre ? GENRE_THEMES[selectedGenre] : GENRE_THEMES.Drama
            }
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ExplorePage;
