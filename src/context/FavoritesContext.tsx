import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface FavoritesContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (imdbID: string) => void;
  isFavorite: (imdbID: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  // Sync favorites with localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addToFavorites = (movie: Movie) => {
    setFavorites((prev) => {
      const updatedFavorites = [...prev, movie];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Store updated favorites in localStorage
      return updatedFavorites;
    });
  };

  const removeFromFavorites = (imdbID: string) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((movie) => movie.imdbID !== imdbID);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage after removal
      return updatedFavorites;
    });
  };

  const isFavorite = (imdbID: string) => {
    return favorites.some((movie) => movie.imdbID === imdbID);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
