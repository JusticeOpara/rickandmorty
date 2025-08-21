"use client";

import { Card, Dropdown, Pagination } from "@/components/ui";
import React, { useMemo, useState } from "react";
import {
  useGetRickAndMortyPaginatedQuery,
} from "@/services/rickandmortyService";
import { Heart } from "lucide-react";
import { selectFavorites } from "@/store/slices/favourite-slice";
import { useSelector } from "react-redux";
import SearchBar from "@/components/ui/SearchBar";
import ErrorWithRetry from "@/components/common/ErrorWithRetry";
import { ISortOption } from "@/types";

const AppDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedSort, setSelectedSort] = useState<ISortOption>('all');

  const {
    data: rickandmortyData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetRickAndMortyPaginatedQuery(currentPage, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });
  

  const favorites = useSelector(selectFavorites);


  const toggleFavoritesFilter = () => {
    setShowFavorites((prev) => !prev);
        setSelectedSort('all');
  };
 // Filter and sort characters
  const charactersToDisplay = useMemo(() => {
    let characters = showFavorites
      ? rickandmortyData?.results?.filter((character) =>
          favorites.includes(character.id)
        )
      : rickandmortyData?.results;

    // Apply gender filter
    if (characters && selectedSort !== 'all') {
      characters = characters.filter(
        (character) => character.gender.toLowerCase() === selectedSort
      );
    }

    return characters;
  }, [rickandmortyData?.results, showFavorites, favorites, selectedSort]);

 

  const getErrorMessage = () => {
    if (error) {
      if ("status" in error) {
        if (error.status === "TIMEOUT") {
          return "Request timed out. Please try again.";
        }
        return `Error: ${error.status}`;
      }
      return "Failed to load characters";
    }
    return "An unexpected error occurred";
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return (
      <div className="bg-[#0F1117] p-8 min-h-screen flex items-center justify-center">
        <ErrorWithRetry message={getErrorMessage()} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="bg-[#0F1117] p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 justify-end items-center mb-8">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setPage={setCurrentPage}
          />

          <button
            onClick={toggleFavoritesFilter}
            className={`flex items-center gap-2  font-medium ${
              showFavorites
                ? "bg-white text-black"
                : "text-white"
            }`}
            disabled={isLoading}
          >
            <Heart
              className={`w-4 h-4 ${showFavorites ? "fill-current" : ""}`}
            />
            {showFavorites
              ? "Show All"
              : `Show Favorites (${favorites.length})`}
          </button>

            <Dropdown
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
              disabled={isLoading  || showFavorites}
            />
        </div>

        {showFavorites && favorites.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">
              No favorites yet. Click the heart icon on characters to add them!
            </p>
          </div>
        )}
       

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
         
          {charactersToDisplay?.map((data) => (
            <Card
              key={data.id}
              id={data.id}
              title={data.name}
              date={data.created}
              posterUrl={data.image}
              status={data.status}
              gender={data.gender}
            />
          ))}
        </div>

        <div className="mt-6">
          {rickandmortyData?.info && (
            <Pagination
              currentPage={currentPage}
              totalPages={rickandmortyData.info.pages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AppDashboard;
