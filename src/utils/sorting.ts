import { Movie, SortOption } from '../types/movie';

/**
 * Filters movies by search query and genre.
 * 
 * @param {Movie[]} movies - Array of movies to filter.
 * @param {string} searchQuery - Search query to match against movie titles.
 * @param {string | null} selectedGenre - The selected genre to filter by. If null, all genres are allowed.
 * @returns {Movie[]} - Array of filtered movies.
 */


export const sortMovies = (movies: Movie[], sortBy: SortOption): Movie[] => {
  switch (sortBy) {
    case 'rating':
      return [...movies].sort((a, b) => 
        (parseFloat(b.imdbRating || '0') - parseFloat(a.imdbRating || '0'))
      );
    case 'year':
      return [...movies].sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    case 'title':
      return [...movies].sort((a, b) => a.Title.localeCompare(b.Title));
    default:
      return movies;
  }
};


export const filterMovies = (movies: Movie[], searchQuery: string, selectedGenre: string | null): Movie[] => {
  // Normalize the search query to lowercase for case-insensitive comparison
  const normalizedQuery = searchQuery.toLowerCase();

  return movies.filter(movie => {
    // Check if the movie title contains the search query
    const matchesSearchQuery = movie.Title.toLowerCase().includes(normalizedQuery);

    // Check if the movie genre matches the selected genre (or if no genre is selected)
    const matchesGenre = selectedGenre ? movie.Genre === selectedGenre : true;

    // Only return movies that match both the search query and the selected genre
    return matchesSearchQuery && matchesGenre;
  });
};
