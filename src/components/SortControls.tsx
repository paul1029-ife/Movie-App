import React from "react";
import { Film, Star, Clock, TrendingUp } from "lucide-react";
import { SortControlsProps, SortOptionProps } from "../types/movie";

const SortOption: React.FC<SortOptionProps> = ({
  label,
  value,
  currentSort,
  icon,
  onClick,
}) => (
  <button
    onClick={() => onClick(value)}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      currentSort === value
        ? "bg-blue-600 text-white"
        : "bg-gray-200 hover:bg-gray-300"
    }`}
  >
    {icon}
    {label}
  </button>
);

export const SortControls: React.FC<SortControlsProps> = ({
  currentSort,
  onSortChange,
}) => (
  <div className="flex flex-wrap gap-4 justify-center">
    <SortOption
      label="Default"
      value="default"
      currentSort={currentSort}
      icon={<Film size={18} />}
      onClick={onSortChange}
    />
    <SortOption
      label="Rating"
      value="rating"
      currentSort={currentSort}
      icon={<Star size={18} />}
      onClick={onSortChange}
    />
    <SortOption
      label="Year"
      value="year"
      currentSort={currentSort}
      icon={<Clock size={18} />}
      onClick={onSortChange}
    />
    <SortOption
      label="Title"
      value="title"
      currentSort={currentSort}
      icon={<TrendingUp size={18} />}
      onClick={onSortChange}
    />
  </div>
);
