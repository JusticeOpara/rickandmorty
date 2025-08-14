import { endpoints } from "@/utils";
import { REQUEST_METHODS } from "@/contants";
import { apiSlice } from "@/store";
import { ICharacterAPIResponse } from "@/types";

export const prickandmortyApiService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRickAndMorty: builder.query({
      query: () => ({
        url: endpoints.all_rickandmorty_character,
        method: REQUEST_METHODS.GET
      }),
      transformResponse: (response: ICharacterAPIResponse) => response,
    }),
  }),
});

export const { useGetRickAndMortyQuery } = prickandmortyApiService;