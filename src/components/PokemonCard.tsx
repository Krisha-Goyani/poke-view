import { Pokemon } from '../types/pokemon';
import Image from 'next/image';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="p-4">
        <div className="relative w-full h-32 flex justify-center items-center bg-gray-50 rounded-md">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={96}
            height={96}
            className="object-contain"
            priority={false}
          />
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-600">Name:</span>
            <span className="text-sm text-gray-900 capitalize">{pokemon.name}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-600">Height:</span>
            <span className="text-sm text-gray-900">{pokemon.height}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-600">Weight:</span>
            <span className="text-sm text-gray-900">{pokemon.weight}kg</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-600">Order:</span>
            <span className="text-sm text-gray-900">#{pokemon.order}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard; 