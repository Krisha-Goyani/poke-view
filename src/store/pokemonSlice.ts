import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonState } from '../types/pokemon';

const initialState: PokemonState = {
  pokemonData: [],
  currentPage: 1,
  itemsPerPage: 5,
  currentMaxPages: 120,
  totalPokemons: 0,
  isLoading: false,
  error: null,
  searchTerm: '',
  sortOrder: '',
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pokemonData = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setTotalPokemons: (state, action: PayloadAction<number>) => {
      state.totalPokemons = action.payload;
    },
    setCurrentMaxPages: (state, action: PayloadAction<number>) => {
      state.currentMaxPages = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPokemons,
  setCurrentPage,
  setItemsPerPage,
  setTotalPokemons,
  setCurrentMaxPages,
  setSearchTerm,
  setSortOrder,
  setLoading,
  setError,
} = pokemonSlice.actions;

export default pokemonSlice.reducer; 