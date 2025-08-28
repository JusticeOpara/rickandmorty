"use client";

import { Card, Dropdown } from "@/components/ui";
import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { useGetCharacterWithPaginationQuery } from "@/services/rickandmortyService";
import ErrorWithRetry from "@/components/common/ErrorWithRetry";
import { getRickAndMortyErrorMessage } from "@/utils/errorMessage";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { genderOptions, speciesOptions, statusOptions } from "@/contants/mock";
import { ICharacter } from "@/types";

const AppCharacters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allCharacters, setAllCharacters] = useState<ICharacter[]>([]);
  const [selectedGen, setSelectedGen] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSpecies, setSelectedSpecies] = useState("all");

  // Intersection Observer for infinite scroll
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const {
    data: rickandmortyData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetCharacterWithPaginationQuery(currentPage, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  // Append new results whenever page changes
  useEffect(() => {
    if (rickandmortyData?.results) {
      setAllCharacters((prev) => {
        // Avoid duplicates when refetch triggers
        const newOnes = rickandmortyData.results.filter(
          (ch) => !prev.some((p) => p.id === ch.id)
        );
        return [...prev, ...newOnes];
      });
    }
  }, [rickandmortyData]);

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

    // Filter characters
  const charactersToDisplay = useMemo(() => {
    let characters = allCharacters;

    if (characters && selectedGen !== "all") {
      characters = characters.filter(
        (character) => character.gender.toLowerCase() === selectedGen
      );
    }

    if (characters && selectedStatus !== "all") {
      characters = characters.filter(
        (character) => character.status.toLowerCase() === selectedStatus
      );
    }

    if (characters && selectedSpecies !== "all") {
      characters = characters.filter(
        (character) => character.species.toLowerCase() === selectedSpecies
      );
    }

    return characters;
  }, [allCharacters, selectedGen, selectedStatus, selectedSpecies]);

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
    <div className="p-8 min-h-screen h-full w-full">
      <div className="max-w-7xl mx-auto">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-end items-center mb-8">
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

        {/* Character Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {isLoading && allCharacters.length === 0
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-black rounded-xl p-4 shadow-md"
                >
                  <Skeleton height={200} className="mb-4 rounded-lg" />
                  <Skeleton height={20} width="80%" className="mb-2" />
                  <Skeleton height={15} width="60%" />
                </div>
              ))
            : charactersToDisplay && charactersToDisplay.length > 0
            ? charactersToDisplay.map((data) => (
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
            : !isLoading && (
                <div className="col-span-full text-center text-gray-400">
                  No characters found.
                </div>
              )}
        </div>

        {/* Loader sentinel for infinite scroll */}
        <div ref={loaderRef} className="h-16 flex items-center justify-center">
          {isFetching && (
            <span className="text-gray-400">Loading more characters...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppCharacters;
