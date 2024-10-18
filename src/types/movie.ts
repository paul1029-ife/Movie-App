// types/movie.ts
export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    Genre: string;
    Plot?: string;
    Runtime?: string;
    Director?: string;
    Actors?: string;
    imdbRating?: string;
    Released?: string;
    Awards?: string;
    Language?: string;
    Country?: string;
    Type: 'movie' | 'series' | 'episode';
    Response?: any;
    Error?: any;
  }
  
  export type SortOption = 'default' | 'rating' | 'year' | 'title';
  
  export type GenreTheme = {
    primary: string;
    secondary: string;
    text: string;
    hover: string;
    gradient: string;
  };
  
  export type GenreThemes = {
    [key: string]: GenreTheme;
  };
  
  export type MoviesByGenre = {
    [key: string]: string[];
  };
  
  export interface ScrollButtonProps {
    direction: 'left' | 'right';
    onClick: () => void;
    theme?: GenreTheme;
  }
  
  export interface SortOptionProps {
    label: string;
    value: SortOption;
    currentSort: SortOption;
    icon: React.ReactNode;
    onClick: (value: SortOption) => void;
  }
  
  export interface MovieModalProps {
    movie: Movie | null |  undefined | any; 

    onClose: () => void;
    theme: GenreTheme;
  }
  
  export interface MovieCardProps {
    movie: Movie;
    onClick: (movie: Movie) => void;
    theme?: GenreTheme;
  }
  
  export interface GenreSectionProps {
    genre: string;
    movies: Movie[];
    theme: GenreTheme;
    isExpanded: boolean;
    onExpandToggle: () => void;
    onMovieSelect: (movie: Movie) => void;
    sortBy: SortOption;
  }
  
  export interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  export interface GenreFilterProps {
    genres: string[];
    selectedGenre: string | null;
    onGenreSelect: (genre: string | null) => void;
    themes: GenreThemes;
  }
  
  export interface SortControlsProps {
    currentSort: SortOption;
    onSortChange: (sort: SortOption) => void;
  }