"use client";

import {
  useGetCharacterByIdQuery,
  useGetEpisodeByIdQuery,
} from "@/services/rickandmortyService";
import { useParams } from "next/navigation";

import React from "react";

const CharacterDetails = () => {
  const { id } = useParams();

  const characterId = Number(id);

  const {
    data: characterById,
    isLoading,
    error,
  } = useGetCharacterByIdQuery(characterId, {
    skip: isNaN(characterId),
  });

  const episodeIds = characterById?.episode
    ?.map((ep: string) => ep.split("/").pop())
    .join(",");

  const { data: episodes, isLoading: epLoading } = useGetEpisodeByIdQuery(
    episodeIds!,
    { skip: !episodeIds }
  );

  return (
    <div className=" text-white min-h-screen p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <span className="text-2xl font-bold">{characterById?.name}</span>
      </header>

      <div className="flex md:flex-row flex-col gap-6">
        <div className="flex-1">
          <div className="relative mb-8">
            <div
              className="w-full h-96 bg-cover bg-center rounded-lg relative overflow-hidden"
              style={{
                backgroundImage: characterById?.image
                  ? `url(${characterById.image})`
                  : undefined,
              }}
            >
           
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="backdrop-blur-md bg-white/10 rounded-xl border border-white/20 p-4 shadow-xl">
           
                  <h1 className="text-2xl font-bold mb-3 text-white drop-shadow-lg">
                    {characterById?.name}
                  </h1>

        
                  <div className="grid grid-cols-3 gap-2">
    
                    <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2 border border-white/10">
                      <div className="text-white/70 text-xs">Episodes</div>
                      <div className="text-white font-semibold text-sm">
                        {characterById?.episode.length}
                      </div>
                    </div>

                 
                    <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2 border border-white/10">
                      <div className="text-white/70 text-xs">Status</div>
                      <div className="flex items-center gap-1">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            characterById?.status === "Alive"
                              ? "bg-green-400"
                              : characterById?.status === "Dead"
                              ? "bg-red-400"
                              : "bg-gray-400"
                          }`}
                        ></div>
                        <div className="text-white font-semibold text-sm">
                          {characterById?.status}
                        </div>
                      </div>
                    </div>

      
                    <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2 border border-white/10">
                      <div className="text-white/70 text-xs">Species</div>
                      <div className="text-white font-semibold text-sm">
                        {characterById?.species}
                      </div>
                    </div>

                   
                    <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2 border border-white/10 col-span-1">
                      <div className="text-white/70 text-xs">Origin</div>
                      <div
                        className="text-white font-semibold text-xs truncate"
                        title={characterById?.origin?.name}
                      >
                        {characterById?.origin?.name}
                      </div>
                    </div>

             
                    <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2 border border-white/10 col-span-2">
                      <div className="text-white/70 text-xs">Location</div>
                      <div
                        className="text-white font-semibold text-xs truncate"
                        title={characterById?.location?.name}
                      >
                        {characterById?.location?.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Episodes */}

        <div className="bg-black text-white p-6 rounded-lg border border-gray-800 max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-white">Episodes</h1>

          <div className="space-y-6">
            {Array.isArray(episodes) ? (
              episodes.map((episode, idx) => (
                <React.Fragment key={episode?.id}>
                  <div>
                    <div className="">
                      <h2 className="text-xl font-medium text- mb-2 ">
                        {episode?.name}
                      </h2>
                      <p className="text-[#79797D] text-sm">
                        {episode?.episode} - {episode?.air_date}
                      </p>
                    </div>
                  </div>
                  {idx < episodes.length - 1 && (
                    <div className="border-b border-gray-700"></div>
                  )}
                </React.Fragment>
              ))
            ) : (
              <div key={episodes?.id}>
                <div className="">
                  <h2 className="text-xl font-medium  ">{episodes?.name}</h2>
                  <p className="text-gray-400 text-sm">
                    {episodes?.episode} - {episodes?.air_date}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
