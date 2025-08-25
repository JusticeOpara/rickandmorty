import { endpoints } from "@/utils";
import { REQUEST_METHODS } from "@/contants";
import { apiSlice } from "@/store";
import { ICharacterAPIResponse } from "@/types";

export const rickandmortyApiService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRickAndMortyCharacters: builder.query({
      query: () => ({
        url: endpoints.all_rickandmorty_character,
        method: REQUEST_METHODS.GET
      }),
      transformResponse: (response: ICharacterAPIResponse) => response,
    }),
     getRickAndMortyPaginated: builder.query<ICharacterAPIResponse, number>({
      query: (page) => ({
        url: endpoints.all_rickandmorty_character_paginated(page),
        method: REQUEST_METHODS.GET
      }),
      transformResponse: (response: ICharacterAPIResponse) => response,
    }),
      getRickAndMortyEpisodesPaginated: builder.query<ICharacterAPIResponse, number>({
      query: (page) => ({
        url: endpoints.all_rickandmorty_episodes_paginated(page),
        method: REQUEST_METHODS.GET
      }),
      transformResponse: (response: ICharacterAPIResponse) => response,
    }),
    
    getCharacterById: builder.query({
      query: (id) => `${endpoints.rickandmorty_single_character}/${id}`,
    }),
  }),
});

export const { useGetAllRickAndMortyCharactersQuery,
  useGetRickAndMortyPaginatedQuery,
  useGetRickAndMortyEpisodesPaginatedQuery,
  useGetCharacterByIdQuery} = rickandmortyApiService;