"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGetEpisodeWithPaginationQuery } from "@/services/rickandmortyService";
import ErrorWithRetry from "@/components/common/ErrorWithRetry";
import { getRickAndMortyErrorMessage } from "@/utils/errorMessage";
import { IEpisode } from "@/types";
import Skeleton from "react-loading-skeleton";

const Episodes: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [allEpisode, setAllEpisode] = useState<IEpisode[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: rickandmortyEpisodes,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetEpisodeWithPaginationQuery(currentPage, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (rickandmortyEpisodes?.results) {
      setAllEpisode((prev) => {
        // Avoid duplicates when refetch triggers
        const newOnes = rickandmortyEpisodes.results.filter(
          (ch) => !prev.some((p) => p.id === ch.id)
        );
        return [...prev, ...newOnes];
      });
    }
  }, [rickandmortyEpisodes]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !isFetching &&
        rickandmortyEpisodes?.info?.next
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    },
    [isFetching, rickandmortyEpisodes]
  );

  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  const episodesToDisplay = useMemo(() => {
    const episodes = rickandmortyEpisodes?.results;

    return episodes;
  }, [rickandmortyEpisodes?.results]);

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
    <div className="text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Episodes</h2>
      <div className="space-y-6">
        {isLoading && allEpisode.length === 0
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="border-b border-gray-700 pb-4 cursor-default"
              >
               
                <Skeleton height={20} width="70%" className="mb-2 rounded-md" />
      
                <Skeleton height={14} width="40%" className="rounded-md" />
              </div>
            ))
          : episodesToDisplay && episodesToDisplay.length > 0
          ? episodesToDisplay?.map((ep) => (
              <div
                key={ep.id}
                className="border-b border-gray-700 pb-4 cursor-default"
              >
                <a
                  href="#"
                  className="text-white font-medium hover:underline block text-lg"
                >
                  {ep.name}
                </a>
                <p className="text-[#79797D] text-sm">
                  {ep.episode} - {ep.air_date}
                </p>
              </div>
            ))
          : !isLoading && (
              <div className="col-span-full text-center text-gray-400">
                No Episodes found.
              </div>
            )}
      </div>

      <div ref={loaderRef} className="h-16 flex items-center justify-center">
        {isFetching && (
          <span className="text-gray-400">Loading more episodes...</span>
        )}
      </div>
    </div>
  );
};

export default Episodes;
