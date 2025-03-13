export interface Pokemon {
  name: string;
  height: number;
  weight: number;
  order: number;
  image: string;
}

export interface PokemonState {
  pokemonData: Pokemon[];
  currentPage: number;
  itemsPerPage: number;
  currentMaxPages: number;
  totalPokemons: number;
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  sortOrder: string;
} 