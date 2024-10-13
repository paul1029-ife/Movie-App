import React from 'react';

interface MovieCardProps {
  title: string;
  year: string;
  poster: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, year, poster }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
      <img
        src={poster !== "N/A" ? poster : `https://via.placeholder.com/300x450?text=${encodeURIComponent(title)}`}
        alt={`${title} poster`}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate">{title}</h3>
        <p className="text-sm text-gray-600">{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;