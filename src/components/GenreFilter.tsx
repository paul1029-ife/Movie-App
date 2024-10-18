import React from 'react';
import { motion } from 'framer-motion';
import { GenreFilterProps } from '../types/movie';

export const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenre,
  onGenreSelect,
}) => (
  <div className="flex gap-2 flex-wrap justify-center">
    {/* Button for selecting all genres */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onGenreSelect(null)}
      className={`px-4 py-2 rounded-lg transition-colors ${
        !selectedGenre 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 hover:bg-gray-300'
      }`}
    >
      All
    </motion.button>

    {/* Genre buttons */}
    {genres.map((genre) => (
      <motion.button
        key={genre}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onGenreSelect(genre)}
        className={`px-4 py-2 rounded-lg transition-colors ${
          selectedGenre === genre 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        {genre}
      </motion.button>
    ))}
  </div>
);
