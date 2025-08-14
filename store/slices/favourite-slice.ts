// src/features/favorites/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favorites: number[];
}

const loadFavoritesFromLocalStorage = (): number[] => {
  if (typeof window !== 'undefined') {
    const storedFavorites = localStorage.getItem('rickAndMortyFavorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }
  return [];
};

const initialState: FavoritesState = {
  favorites: loadFavoritesFromLocalStorage(),
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<number>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        localStorage.setItem('rickAndMortyFavorites', JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
      localStorage.setItem('rickAndMortyFavorites', JSON.stringify(state.favorites));
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const index = state.favorites.indexOf(action.payload);
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
      localStorage.setItem('rickAndMortyFavorites', JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;

export const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites.favorites;
export const selectIsFavorite = (id: number) => (state: { favorites: FavoritesState }) => 
  state.favorites.favorites.includes(id);

export default favoritesSlice.reducer;