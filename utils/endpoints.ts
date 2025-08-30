export const endpoints = {
  all_rickandmorty_character: "/character",
  all_rickandmorty_character_paginated: (
    page?: number,
    filters?: {
      name?: string;
      status?: string;
      species?: string;
      gender?: string;
    }
  ) => {
    const params = new URLSearchParams();

    if (page) params.append("page", String(page));
    if (filters?.name) params.append("name", filters.name);
    if (filters?.status && filters.status !== "all")
      params.append("status", filters.status);
    if (filters?.species && filters.species !== "all")
      params.append("species", filters.species);
    if (filters?.gender && filters.gender !== "all")
      params.append("gender", filters.gender);

    return `/character?${params.toString()}`;
  },

  all_episodes_paginated: (page?: number) => `/episode?page=${page}`,

  all_locations_paginatied: (page?: number) => `/location?page=${page}`,

  single_character: (id: number) => `/character/${id}`,
  single_episode: (id: number) => `/episode/${id}`,
  single_location: (id: number) => `/location/${id}`,
};
