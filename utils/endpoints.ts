
export const endpoints = {
    all_rickandmorty_character: "/character",
    all_rickandmorty_character_paginated: (page?: number) => `/character?page=${page}`,
    all_prickandmorty_episodes: "/episodes",
        all_rickandmorty_episodes_paginated: (page?: number) => `/episodes?page=${page}`,
    rickandmorty_single_character: (id: string | number) => `character/${id}`
};