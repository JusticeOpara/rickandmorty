"use client"
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxVisiblePages = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 ">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
      >
        «
      </button>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
      >
        ‹
      </button>

      {startPage > 1 && (
        <span className="px-3 py-1 text-gray-400">...</span>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded ${
            currentPage === number
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
        <span className="px-3 py-1 text-gray-400">...</span>
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
      >
        ›
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
      >
        »
      </button>
    </div>
  );
};

export default Pagination;