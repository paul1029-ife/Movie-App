import React from 'react';
import { useFavorites } from '../context/FavoritesContext';

interface MovieCardProps {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
  onMovieSelect: (movie: { imdbID: string; title: string; year: string; poster: string }) => void; // New prop
}

const MovieCard: React.FC<MovieCardProps> = ({ imdbID, title, year, poster, onMovieSelect }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleFavoriteClick = () => {
    if (isFavorite(imdbID)) {
      removeFromFavorites(imdbID);
    } else {
      addToFavorites({ imdbID, Title: title, Year: year, Poster: poster });
    }
  };

  // Trigger the movie selection when the card is clicked
  const handleCardClick = () => {
    onMovieSelect({ imdbID, title, year, poster });
  };

  return (
    <div
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
      onClick={handleCardClick} // On click, the movie is selected
    >
      <img
        src={poster !== "N/A" ? poster : `https://via.placeholder.com/300x450?text=${encodeURIComponent(title)}`}
        alt={`${title} poster`}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate">{title}</h3>
        <p className="text-sm text-gray-600">{year}</p>
      </div>
      <button 
        onClick={handleFavoriteClick}
        className={`w-full py-2 text-white ${
          isFavorite(imdbID) ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        } transition-colors duration-300`}
      >
        {isFavorite(imdbID) ? 'Remove from favorites' : 'Add to favorites'}
      </button>
    </div>
  );
};

export default MovieCard;
