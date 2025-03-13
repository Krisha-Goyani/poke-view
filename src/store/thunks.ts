import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setPokemons,
  setTotalPokemons,
  setLoading,
  setError,
} from "./pokemonSlice";
import { Pokemon } from "../types/pokemon";
import { AppDispatch, RootState } from "./store";

// Helper function to get consistent random values for a page
const getPageRandomValues = (pageNumber: number, itemsPerPage: number) => {
  const heights: number[] = [];
  const weights: number[] = [];

  for (let i = 0; i < itemsPerPage; i++) {
    const heightSeed = (pageNumber * 1000 + i * 7 + 13) * 17;
    const weightSeed = (pageNumber * 1000 + i * 13 + 17) * 23;

    heights.push(Math.floor((heightSeed % 20) + 5)); // Random height between 5-25
    weights.push(Math.floor((weightSeed % 1000) + 100)); // Random weight between 100-1100 
  }

  return { heights, weights };
};

export const fetchPokemonData = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>("pokemon/fetchPokemonData", async (_, { dispatch, getState }) => {
  const state = getState().pokemon;
  const { currentPage, itemsPerPage, searchTerm } = state;

  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    let url: string;
    if (searchTerm) {
      url = `https://pokeapi.co/api/v2/pokemon?limit=1000&name=${searchTerm}`;
    } else {
      const offset = (currentPage - 1) * itemsPerPage;
      url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${itemsPerPage}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    const totalPokemons = Math.min(data.count, 1000);
    dispatch(setTotalPokemons(totalPokemons));

    let filteredResults = data.results;
    if (searchTerm) {
      filteredResults = data.results
        .filter((pokemon: { name: string }) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 1000);

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      filteredResults = filteredResults.slice(startIndex, endIndex);
    }

    // Get random values for current page
    const { heights, weights } = getPageRandomValues(currentPage, itemsPerPage);

    const pokemonData: Pokemon[] = filteredResults.map(
      (pokemon: { name: string; url: string }, index: number) => {
        const id = pokemon.url.split("/")[6];
        return {
          name: pokemon.name,
          height: heights[index],
          weight: weights[index],
          order: parseInt(id),
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      }
    );

    dispatch(setPokemons(pokemonData));
  } catch (error) {
    dispatch(
      setError(error instanceof Error ? error.message : "An error occurred")
    );
  } finally {
    dispatch(setLoading(false));
  }
});
