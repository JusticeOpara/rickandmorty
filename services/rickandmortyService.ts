import { endpoints } from "@/utils";
import { REQUEST_METHODS } from "@/contants";
import { apiSlice } from "@/store";
import {
  ICharacter,
  ICharacterAPIResponse,
  IEpisode,
  IEpisodeAPIResponse,
  ILocation,
  ILocationAPIResponse,
} from "@/types";

export const rickandmortyApiService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRickAndMortyCharacters: builder.query({
      query: () => ({
        url: endpoints.all_rickandmorty_character,
        method: REQUEST_METHODS.GET,
      }),
      transformResponse: (response: ICharacterAPIResponse) => response,
    }),
    getCharacterWithPagination: builder.query<
      ICharacterAPIResponse,
      {
        page: number;
        filters?: {
          name?: string;
          status?: string;
          species?: string;
          gender?: string;
        };
      }
    >({
      query: ({ page, filters }) => ({
        url: endpoints.all_rickandmorty_character_paginated(page, filters),
        method: REQUEST_METHODS.GET,
      }),
      transformResponse: (response: ICharacterAPIResponse) => response,
    }),

  
    getLocationWithPagination: builder.query<ILocationAPIResponse, number>({
      query: (page) => ({
        url: endpoints.all_locations_paginatied(page),
        method: REQUEST_METHODS.GET,
      }),
      transformResponse: (response: ILocationAPIResponse) => response,
    }),

    getEpisodeWithPagination: builder.query({
      query: (page) => ({
        url: endpoints.all_episodes_paginated(page),
        method: REQUEST_METHODS.GET,
      }),
      transformResponse: (response: IEpisodeAPIResponse) => response,
    }),

    getCharacterById: builder.query({
      query: (id) => endpoints.single_character(id),
       transformResponse: (response: ICharacter) =>
        response,
    }),
    getEpisodeById: builder.query({
      query: (id) => endpoints.single_episode(id),
       transformResponse: (response: IEpisode) =>
        response,
    }),
     getLocationById: builder.query({
      query: (id) => endpoints.single_location(id),
      transformResponse: (response: ILocation) =>
        response,
    }),
  }),
});

export const {
  useGetAllRickAndMortyCharactersQuery,
  useGetCharacterWithPaginationQuery,
  useGetLocationWithPaginationQuery,
  useGetEpisodeWithPaginationQuery,
  useGetEpisodeByIdQuery,
  useGetLocationByIdQuery,
  useGetCharacterByIdQuery,
} = rickandmortyApiService;
