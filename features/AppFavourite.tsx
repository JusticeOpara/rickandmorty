"use client";

import { Card } from "@/components/ui";
import { useMemo } from "react";
import { Heart } from "lucide-react";
import { selectFavorites } from "@/store/slices/favourite-slice";
import { useSelector } from "react-redux";

import ErrorWithRetry from "@/components/common/ErrorWithRetry";
import Link from "next/link";
import { useGetAllRickAndMortyCharactersQuery } from "@/services/rickandmortyService";
import { getRickAndMortyErrorMessage } from "@/utils/errorMessage";
import Skeleton from "react-loading-skeleton";

const FavouritesPage: React.FC = () => {
  // Get all characters to filter favorites from
  const {
    data: allCharactersData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllRickAndMortyCharactersQuery({});

  const favorites = useSelector(selectFavorites);

  // Filter favorite characters
  const favoriteCharacters = useMemo(() => {
    if (!allCharactersData?.results) return [];

    return allCharactersData.results.filter((character) =>
      favorites.includes(character.id)
    );
  }, [allCharactersData, favorites]);
  console.log("Favorite Characters:", favoriteCharacters);

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Heart className="md:w-8 md:h-8 fill-current text-red-500" />
          <span className="text-lg md:text-2xl">Favorite Characters</span>  
            <span className="text-teal-400 ml-2">({favorites.length})</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
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
          ) : favoriteCharacters && favoriteCharacters.length > 0 ? (
            favoriteCharacters.map((data) => (
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
            <div className="text-center py-12 text-gray-400">
              <Heart className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-lg mb-4">
                You haven&apos;t added any favorites yet.
              </p>
              <p className="text-sm mb-6 text-gray-500">
                Click the heart icon on characters to add them to your
                favorites!
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
                >
                  Browse Characters
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouritesPage;
