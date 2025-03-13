import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppRedux';
import { fetchPokemonData } from '../store/thunks';
import Controls from '../components/Controls';
import PokemonGallery from '../components/PokemonGallery';
import Pagination from '../components/Pagination';

export default function Home() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonData());
  }, [dispatch]);

  return (
    <>
      <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Pokemon Gallery</h1>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          <Controls />

          <PokemonGallery />

          <Pagination />
        </div>
      </main>
    </>
  );
}
