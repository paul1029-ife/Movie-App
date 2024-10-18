import { motion } from 'framer-motion';
import { X, Clock, Star } from 'lucide-react';
import { MovieModalProps } from '../types/movie';
import { useFavorites } from '../context/FavoritesContext';


interface ButtonProps {
    imdbID: string;
    title: string;
    year: string;
    poster: string;
  }
  
  const Button: React.FC<ButtonProps> = ({ imdbID, title, year, poster }) => {
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
    const handleFavoriteClick = () => {
      if (isFavorite(imdbID)) {
        removeFromFavorites(imdbID);
      } else {
        addToFavorites({ imdbID, Title: title, Year: year, Poster: poster });
      }
    };
  
    return (
      <button
        onClick={handleFavoriteClick}
        className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
          isFavorite(imdbID) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        } hover:bg-opacity-80`}
      >
        {isFavorite(imdbID) ? <p>Remove from favorite</p> : <p>Add to favorite</p>}
      </button>
    );
  };
  

export const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      onClick={e => e.stopPropagation()}
    >
      <div className="relative">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-72 object-cover rounded-t-xl"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{movie.Title}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Clock size={16} /> {movie.Runtime}
            </span>
            <span className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500" /> {movie.imdbRating}
            </span>
            <span>{movie.Year}</span>
          </div>
        </div>

        <p className="text-gray-700">{movie.Plot}</p>

        <div className="space-y-2">
          <div className="font-semibold">Director</div>
          <div className="text-gray-700">{movie.Director}</div>
        </div>

        <div className="space-y-2">
          <div className="font-semibold">Cast</div>
          <div className="text-gray-700">{movie.Actors}</div>
        </div>
        <div className='flex items-center justify-center '>
           <Button 
           imdbID={movie.imdbID}
           title={movie.Title}
           poster={movie.Poster}
           year={movie.Year}
           />
        </div>
      </div>
    </motion.div>
  </motion.div>
);