import { GenreThemes } from '../types/movie';

export const GENRE_THEMES: GenreThemes = {
  Action: {
    primary: 'bg-red-600',
    secondary: 'bg-red-100',
    text: 'text-red-600',
    hover: 'hover:bg-red-700',
    gradient: 'from-red-500 to-red-700'
  },
  Drama: {
    primary: 'bg-blue-600',
    secondary: 'bg-blue-100',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-700',
    gradient: 'from-blue-500 to-blue-700'
  },
  SciFi: {
    primary: 'bg-purple-600',
    secondary: 'bg-purple-100',
    text: 'text-purple-600',
    hover: 'hover:bg-purple-700',
    gradient: 'from-purple-500 to-purple-700'
  },
  Fantasy: {
    primary: 'bg-green-600',
    secondary: 'bg-green-100',
    text: 'text-green-600',
    hover: 'hover:bg-green-700',
    gradient: 'from-green-500 to-green-700'
  },
  Crime: {
    primary: 'bg-gray-600',
    secondary: 'bg-gray-100',
    text: 'text-gray-600',
    hover: 'hover:bg-gray-700',
    gradient: 'from-gray-500 to-gray-700'
  }
};
