"use client";

import { Card, Dropdown, Pagination } from "@/components/ui";
import React, { useMemo, useState } from "react";
import { useGetRickAndMortyPaginatedQuery } from "@/services/rickandmortyService";
import SearchBar from "@/components/ui/SearchBar";
import ErrorWithRetry from "@/components/common/ErrorWithRetry";
import { ISortOption } from "@/types";
import { getRickAndMortyErrorMessage } from "@/utils/errorMessage";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";



const AppDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState<ISortOption>("all");

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

  // Filter and sort characters
  const charactersToDisplay = useMemo(() => {
    let characters = rickandmortyData?.results;

    // Apply gender filter
    if (characters && selectedSort !== "all") {
      characters = characters.filter(
        (character) => character.gender.toLowerCase() === selectedSort
      );
    }

    return characters;
  }, [rickandmortyData?.results, selectedSort]);



  if (isError) {
    return (
      <div className="bg-[#0F1117] p-8 min-h-screen flex items-center justify-center">
        <ErrorWithRetry
          message={getRickAndMortyErrorMessage(error)}
          onRetry={refetch}
        />
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

          <Dropdown
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
         
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-4 shadow-md"
              >
                <Skeleton height={200} className="mb-4 rounded-lg" />
                <Skeleton height={20} width="80%" className="mb-2" />
                <Skeleton height={15} width="60%" />
              </div>
            ))
          ) : charactersToDisplay && charactersToDisplay.length > 0 ? (
            charactersToDisplay.map((data) => (
              <Card
                key={data.id}
                id={data.id}
                title={data.name}
                date={data.created}
                posterUrl={data.image}
                status={data.status}
                gender={data.gender}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              No characters found.
            </div>
          )}

        </div>

        <div className="mt-6">
          {!isLoading && rickandmortyData?.info && (
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
