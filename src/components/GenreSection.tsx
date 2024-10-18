import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GenreSectionProps } from '../types/movie';
import { sortMovies } from '../utils/sorting';

export const GenreSection: React.FC<GenreSectionProps> = ({
  genre,
  movies,
  isExpanded,
  onExpandToggle,
  onMovieSelect,
  sortBy
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sortedMovies = sortMovies(movies, sortBy);

  // Scroll handling logic
  useEffect(() => {
    if (sectionRef.current && isExpanded) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isExpanded]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`space-y-4 bg-white text-black`}
      ref={sectionRef}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{genre}</h2>
        <button
          onClick={onExpandToggle}
          className="text-sm text-blue-500 hover:underline"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {sortedMovies.map((movie) => (
            <div
              key={movie.imdbID}
              className="cursor-pointer"
              onClick={() => onMovieSelect(movie)}
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <p className="mt-2 text-sm">{movie.Title}</p>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
};
