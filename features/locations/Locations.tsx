"use client";

import ErrorWithRetry from "@/components/common/ErrorWithRetry";
import { useGetLocationWithPaginationQuery } from "@/services/rickandmortyService";
import { ILocation } from "@/types";
import { getRickAndMortyErrorMessage } from "@/utils/errorMessage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";

const Locations: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [allLocation, setAllLocation] = useState<ILocation[]>([]);
  const {
    data: rickandmortyLocations,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetLocationWithPaginationQuery(currentPage, {
    refetchOnFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (rickandmortyLocations?.results) {
      setAllLocation((prev) => {
        // Avoid duplicates when refetch triggers
        const newOnes = rickandmortyLocations.results.filter(
          (ch) => !prev.some((p) => p.id === ch.id)
        );
        return [...prev, ...newOnes];
      });
    }
  }, [rickandmortyLocations]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !isFetching &&
        rickandmortyLocations?.info?.next
      ) {
        setCurrentPage((prev) => prev + 1);
      }
    },
    [isFetching, rickandmortyLocations]
  );

  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  const locationToDisplay = useMemo(() => {
    const episodes = rickandmortyLocations?.results;
    return episodes;
  }, [rickandmortyLocations?.results]);

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
    <div className="text-white min-h-screen ">
      <h2 className="text-2xl font-bold mb-6">Locations</h2>
      <div className="space-y-6">
        {isLoading && allLocation.length === 0
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="border-b border-gray-700 pb-4 cursor-default"
              >
                <Skeleton height={20} width="70%" className="mb-2 rounded-md" />

                <Skeleton height={14} width="40%" className="rounded-md" />
              </div>
            ))
          : locationToDisplay && locationToDisplay.length > 0
          ? locationToDisplay?.map((loc) => (
              <div
                key={loc.id}
                className="border-b border-gray-700 pb-4 cursor-default"
              >
                <a
                  href="#"
                  className="text-white font-medium hover:underline block text-lg"
                >
                  {loc.name}
                </a>
                <p className="text-[#79797D] text-sm">
                  {loc.type} - {loc.dimension}
                </p>
              </div>
            ))
          : !isLoading && !isFetching && (
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

export default Locations;
