"use client";

import { Card, Dropdown, Pagination } from "@/components/ui";
import { useMemo, useState } from "react";
import { useGetRickAndMortyEpisodesPaginatedQuery } from "@/services/rickandmortyService";
import SearchBar from "@/components/ui/SearchBar";
import ErrorWithRetry from "@/components/common/ErrorWithRetry";
import { ISortOption } from "@/types";
import { getRickAndMortyErrorMessage } from "@/utils/errorMessage";

const AppEpisodes: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState<ISortOption>("all");

  const {
    data: rickandmortyEpisodes,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetRickAndMortyEpisodesPaginatedQuery(currentPage, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  // Filter episodes
  const episodesToDisplay = useMemo(() => {
    let episodes = rickandmortyEpisodes?.results;

    // Apply filter based on selectedSort
    // Note: Episodes don't have a gender property, so you might want to change this
    // to filter by a different property that episodes have
    if (episodes && selectedSort !== "all") {
      episodes = episodes.filter(
        (episode) => episode.gender.toLowerCase() === selectedSort
      );
    }

    return episodes;
  }, [rickandmortyEpisodes?.results, selectedSort]);

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return (
      <div className="bg-[#0F1117] p-8 min-h-screen flex items-center justify-center">
        <ErrorWithRetry message={getRickAndMortyErrorMessage(error)} onRetry={refetch} />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {episodesToDisplay?.map((episode) => (
             <Card
                          key={episode.id}
                          id={episode.id}
                          title={episode.name}
                          date={episode.created}
                          posterUrl={episode.image}
                          status={episode.status}
                          gender={episode.gender}
                        />
          ))}
        </div>

        <div className="mt-6">
          {rickandmortyEpisodes?.info && (
            <Pagination
              currentPage={currentPage}
              totalPages={rickandmortyEpisodes.info.pages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AppEpisodes;
