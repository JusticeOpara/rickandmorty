import { BASE_URL } from "@/contants";
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, object>,
  tagTypes: ["RickAndMorty"],
  endpoints: () => ({}),
});

