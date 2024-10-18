import React from 'react';
import { Search } from 'lucide-react';
import { SearchBarProps } from '../types/movie';

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <div className="relative flex-grow max-w-md mx-auto">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
    <input
      type="text"
      placeholder="Search movies..."
      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
