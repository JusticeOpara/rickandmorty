
"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { ISortOption } from '@/types';



interface DropdownProps {
  selectedSort: ISortOption;
  onSortChange: (sort: ISortOption) => void;
  disabled?: boolean;
}

const sortOptions: { value: ISortOption; label: string }[] = [
  { value: 'all', label: 'All Genders' },
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'unknown', label: 'Unknown' },
];

const Dropdown: React.FC<DropdownProps> = ({
  selectedSort,
  onSortChange,
  disabled = false,
}) => {
  return (
    <div className="relative">
      <select
        value={selectedSort}
        onChange={(e) => onSortChange(e.target.value as ISortOption)}
        disabled={disabled}
        className="appearance-none bg-slate-800 border border-slate-600 text-white px-4 py-2 pr-8 rounded-md focus:outline-none focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default Dropdown;