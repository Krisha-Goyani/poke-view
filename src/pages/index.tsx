import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppRedux';
import { fetchPokemonData } from '../store/thunks';
import Head from 'next/head';
import Controls from '../components/Controls';
import PokemonGallery from '../components/PokemonGallery';
import Pagination from '../components/Pagination';
import siteConfig from '../config/site';

export default function Home() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonData());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content={siteConfig.description} />
        <meta name="keywords" content="Pokemon, Gallery, Pokedex, Pokemon Images, Pokemon Stats" />
        <meta name="author" content="Your Name or Company" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="canonical" href={siteConfig.url} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:site_name" content={siteConfig.title} />
        <meta property="og:title" content={siteConfig.title} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Pokemon Gallery" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteConfig.url} />
        <meta property="twitter:title" content={siteConfig.title} />
        <meta property="twitter:description" content={siteConfig.description} />
        <meta property="twitter:image" content={siteConfig.ogImage} />
      </Head>

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

          <Controls />

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <PokemonGallery />
              <Pagination />
            </>
          )}
        </div>
      </main>
    </>
  );
}
