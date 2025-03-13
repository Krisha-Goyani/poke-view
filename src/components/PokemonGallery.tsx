import { useAppSelector } from '../hooks/useAppRedux';
import PokemonCard from './PokemonCard';
import { Pokemon } from '../types/pokemon';

const PokemonGallery = () => {
  const { pokemonData, sortOrder } = useAppSelector((state) => state.pokemon);

  const getSortedPokemonData = (data: Pokemon[]): Pokemon[] => {
    const sortedData = [...data];
    
    const sortConfigs = {
      'height-high': (a: Pokemon, b: Pokemon) => b.height - a.height,
      'height-low': (a: Pokemon, b: Pokemon) => a.height - b.height,
      'weight-high': (a: Pokemon, b: Pokemon) => b.weight - a.weight,
      'weight-low': (a: Pokemon, b: Pokemon) => a.weight - b.weight,
      'order-high': (a: Pokemon, b: Pokemon) => b.order - a.order,
      'order-low': (a: Pokemon, b: Pokemon) => a.order - b.order
    };

    return sortOrder && sortConfigs[sortOrder as keyof typeof sortConfigs]
      ? sortedData.sort(sortConfigs[sortOrder as keyof typeof sortConfigs])
      : sortedData;
  };

  const sortedPokemon = getSortedPokemonData(pokemonData);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {sortedPokemon.map((pokemon) => (
        <PokemonCard key={pokemon.order} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonGallery; 