import { useRouter } from 'next/router';
import { useAppSelector } from '../../hooks/useAppRedux';
import Image from 'next/image';
import Link from 'next/link';

const PokemonDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { pokemonData } = useAppSelector((state) => state.pokemon);

  const pokemon = pokemonData.find((p) => p.order.toString() === id);

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Pokemon not found</h1>
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              ← Back to Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Gallery
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-6">
          {/* Left section - Pokemon Image */}
          <div className="flex justify-center items-center bg-gray-50 rounded-lg p-8">
            <div className="relative w-64 h-64">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right section - Pokemon Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 capitalize mb-8">{pokemon.name}</h1>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-gray-700">Height:</span>
                <span className="text-lg text-gray-900">{pokemon.height} m</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-gray-700">Weight:</span>
                <span className="text-lg text-gray-900">{pokemon.weight} kg</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-gray-700">Order:</span>
                <span className="text-lg text-gray-900">{pokemon.order}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;