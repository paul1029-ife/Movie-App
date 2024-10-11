import { ChangeEvent } from "react";

interface SearchBarProps {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ handleSearch }: SearchBarProps) {
  return (
    <div className="flex items-center justify-center mb-8">
    <input
      type="search"
      id="default-search"
      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search Cities,  Countries, Regions"

      required
      onChange={handleSearch}
    />
    </div>
  );
}

export default SearchBar;
