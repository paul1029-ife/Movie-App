// constants/theme.ts
import { GenreThemes, MoviesByGenre } from '../types/movie';

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

export const MOVIES_BY_GENRE: MoviesByGenre = {
  Action: [
    "The Dark Knight",
    "Mad Max: Fury Road",
    "Die Hard",
    "John Wick",
    "Mission: Impossible",
    "The Avengers",
    "Gladiator",
    "Top Gun"
  ],
  Drama: [
    "The Shawshank Redemption",
    "The Godfather",
    "Schindler's List",
    "Forrest Gump",
    "The Green Mile",
    "A Beautiful Mind",
    "The Departed",
    "Fight Club"
  ],
  SciFi: [
    "Inception",
    "The Matrix",
    "Interstellar",
    "Blade Runner",
    "Alien",
    "Ex Machina",
    "Arrival",
    "District 9"
  ],
  Fantasy: [
    "The Lord of the Rings: The Fellowship of the Ring",
    "Harry Potter and the Sorcerer's Stone",
    "Pan's Labyrinth",
    "The Princess Bride",
    "The Neverending Story",
    "Stardust",
    "Coraline",
    "Big Fish"
  ],
  Crime: [
    "Pulp Fiction",
    "Goodfellas",
    "The Silence of the Lambs",
    "Se7en",
    "The Usual Suspects",
    "Heat",
    "Casino",
    "L.A. Confidential"
  ]
};
