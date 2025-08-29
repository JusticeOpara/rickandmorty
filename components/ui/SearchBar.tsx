"use client"
import React, { useState, useEffect } from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
   
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== searchTerm) {
        setSearchTerm(inputValue);

      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, searchTerm, setSearchTerm]);

  return (
    <div className="relative w-[300px] ">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search characters..."
        className="w-full px-4 py-2 rounded-full border text-white placeholder-gray-400 focus:outline-none outline-none"
      />
      {inputValue && (
        <button
          onClick={() => {
            setInputValue('');
            setSearchTerm('');
    
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;