export const endpoints = {
  all_rickandmorty_character: "/character",

  all_rickandmorty_character_paginated: (page?: number) =>
    `/character?page=${page}`,

  all_episodes_paginated: (page?:number) => `/episode?page=${page}`,

    all_locations_paginatied: (page?: number) =>
    `/location?page=${page}`,

  single_character: (id: number) => `/character/${id}`,
  single_episode: (id: number) => `/episode/${id}`,
  single_location: (id: number) => `/location/${id}`
};
