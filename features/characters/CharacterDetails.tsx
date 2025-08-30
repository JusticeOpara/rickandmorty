"use client";

import {
  useGetCharacterByIdQuery,
  useGetEpisodeByIdQuery,
} from "@/services/rickandmortyService";
import { Menu, Star } from "lucide-react";
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
  console.log(characterById, "--singleCharacter");
  return (
    <div className=" text-white min-h-screen p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <span className="text-xl font-bold">{characterById?.name}</span>
        <Menu className="w-6 h-6" />
      </header>

      <div className="flex md:flex-row flex-col gap-6">
        <div className="flex-1 ">
          <div className="relative mb-8">
            <div
              className="w-full h-96 bg-cover bg-center rounded-lg relative"
              style={{
                backgroundImage: characterById?.image
                  ? `url(${characterById.image})`
                  : undefined,
              }}
            >
              <div className="absolute bottom-6 left-6">
                <h1 className="text-4xl font-bold mb-2">
                  {characterById?.name}
                </h1>
                <p className="text-gray-300 mb-4">{characterById?.status}</p>

                
                <div>Episodes: {characterById?.episode.length} (2013 - 2021)</div>
                <div>Status {characterById?.status}</div>
                <div>Species {characterById?.species}</div>
                <div>Origin {characterById?.origin?.name}</div>
                <div>Location {characterById?.location?.name}</div>
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
