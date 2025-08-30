
"use client";

import { Card, Dropdown } from "@/components/ui";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useGetCharacterWithPaginationQuery } from "@/services/rickandmortyService";
import ErrorWithRetry from "@/components/common/ErrorWithRetry";
import { getRickAndMortyErrorMessage } from "@/utils/errorMessage";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { genderOptions, speciesOptions, statusOptions } from "@/contants/mock";
import { ICharacter } from "@/types";
import SearchBar from "@/components/ui/SearchBar";

const AppCharacters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allCharacters, setAllCharacters] = useState<ICharacter[]>([]);
  const [selectedGen, setSelectedGen] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSpecies, setSelectedSpecies] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // reset when filters/search change
  useEffect(() => {
    setCurrentPage(1);
    setAllCharacters([]);
  }, [searchTerm, selectedGen, selectedStatus, selectedSpecies]);

  const {
    data: rickandmortyData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetCharacterWithPaginationQuery({
    page: currentPage,
    filters: {
      name: searchTerm,
      status: selectedStatus,
      species: selectedSpecies,
      gender: selectedGen,
    },
  });

 
  type FetchError = { status?: number };

  useEffect(() => {
    if (rickandmortyData?.results) {
      setAllCharacters((prev) => {
        if (currentPage === 1) return rickandmortyData.results;
        const newOnes = rickandmortyData.results.filter(
          (ch: ICharacter) => !prev.some((p) => p.id === ch.id)
        );
        return [...prev, ...newOnes];
      });
    } else if ((error as FetchError)?.status === 404 && currentPage === 1) {
      // reset when no results found
      setAllCharacters([]);
    }
  }, [rickandmortyData, error, currentPage]);

  // infinite scroll
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !isFetching &&
        rickandmortyData?.info?.next
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    },
    [isFetching, rickandmortyData]
  );

  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  // 🔹 Error handling
  if (isError && (error as FetchError)?.status !== 404) {
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
    <div className=" min-h-screen w-full">
  
      
        <div className="flex flex-col md:flex-row gap-4 justify-end items-center mb-8">
          <div className="hidden md:block">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div className="flex justify-between md:justify-end w-full gap-4">
            <Dropdown
              selectedValue={selectedGen}
              onChange={setSelectedGen}
              options={genderOptions}
              disabled={isLoading}
            />
            <Dropdown
              selectedValue={selectedStatus}
              onChange={setSelectedStatus}
              options={statusOptions}
              disabled={isLoading}
            />
          </div>
          <Dropdown
            selectedValue={selectedSpecies}
            onChange={setSelectedSpecies}
            options={speciesOptions}
            disabled={isLoading}
          />
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {isLoading && allCharacters.length === 0
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-black rounded-xl p-4 shadow-md">
                  <Skeleton height={200} className="mb-4 rounded-lg" />
                  <Skeleton height={20} width="80%" className="mb-2" />
                  <Skeleton height={15} width="60%" />
                </div>
              ))
            : allCharacters.length > 0
            ? allCharacters.map((data) => (
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
            : !isLoading  && !isFetching && (
                <div className="col-span-full text-center text-gray-400">
                  No characters found.
                </div>
              )
              }
        </div>


        <div ref={loaderRef} className="h-16 flex items-center justify-center">
          {isFetching && (
            <span className="text-gray-400">Loading more characters...</span>
          )}
        </div>
   
    </div>
  );
};

export default AppCharacters;
