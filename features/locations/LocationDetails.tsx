"use client";

import ErrorWithRetry from "@/components/common/ErrorWithRetry";
import { Card } from "@/components/ui";
import { useGetCharacterByIdQuery, useGetLocationByIdQuery } from "@/services/rickandmortyService";
import { getRickAndMortyErrorMessage } from "@/utils/errorMessage";
import { useParams } from "next/navigation";
import React from "react";
import Skeleton from "react-loading-skeleton";

const LocationDetails = () => {
  const { id } = useParams();

  const locationId = Number(id);

  const {
    data: locationById,
    isLoading: locationLoading,
    isError: locationError,
    error: locationErrorObj,
    refetch: refetchLocation,
  } = useGetLocationByIdQuery(locationId, { skip: isNaN(locationId) });


  /** ---- CHARACTERS QUERY ---- */
    const characterIds = locationById?.residents
      ?.map((char: string) => char.split("/").pop())
      .join(",");
  
    const {
      data: characters,
      isLoading: charLoading,
      isError: charError,
      error: charErrorObj,
      refetch: refetchCharacters,
    } = useGetCharacterByIdQuery(characterIds!, { skip: !characterIds });
  
    const isLoading = locationLoading || charLoading;
    const isError = locationError || charError;
  
    /** ---- LOADING STATE ---- */
    if (isLoading) {
      return (
        <div className="space-y-6">
  
          <div className="bg-black border border-gray-800 rounded-lg p-4 mb-6">
            <Skeleton height={28} width="40%" className="mb-2" />
            <Skeleton height={20} width="20%" />
          </div>
  
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-black rounded-xl p-4 shadow-md">
                <Skeleton height={200} className="mb-4 rounded-lg" />
                <Skeleton height={20} width="80%" className="mb-2" />
                <Skeleton height={15} width="60%" />
              </div>
            ))}
          </div>
        </div>
      );
    }
  
    /** ---- ERROR STATE ---- */
    if (isError) {
      return (
        <div className="bg-[#0F1117] p-8 min-h-screen flex items-center justify-center">
          <ErrorWithRetry
            message={
              getRickAndMortyErrorMessage(locationErrorObj || charErrorObj) ||
              "Something went wrong"
            }
            onRetry={() => {
              refetchLocation();
              refetchCharacters();
            }}
          />
        </div>
      );
    }
  
    /** ---- EMPTY STATE ---- */
    if (!locationById) {
      return (
        <div className="bg-[#0F1117] p-8 min-h-screen flex items-center justify-center text-gray-400">
          Episode not found
        </div>
      );
    }
  return (
    <div>
      <div className="bg-black border  border-gray-800 rounded-lg p-4 mb-6 flex flex-col md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="md:text-2xl font-bold text-white mb-3">
            {locationById?.name}
          </h2>

          <div className="flex gap-6">
            <div>
              <h1 className="uppercase">Dimension</h1>
              <p className="text-lg font-meduim text-gray-400">
                {locationById?.dimension}
              </p>
            </div>

            <div>
              <h1 className="uppercase">type</h1>
              <p className="text-lg text-gray-400 font-medium mt-2 md:mt-0">
                {locationById?.type}
              </p>
            </div>
          </div>
        </div>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-8 gap-6">

         {Array.isArray(characters) && characters.length > 0 ? (
          characters.map((character) => (
            <Card
              key={character.id}
              id={character.id}
              title={character.name}
              date={character.created}
              posterUrl={character.image}
              status={character.status}
              gender={character.gender}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">
            No characters found.
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationDetails;
