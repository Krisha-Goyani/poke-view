import { useAppDispatch, useAppSelector } from '../hooks/useAppRedux';
import { setCurrentPage } from '../store/pokemonSlice';
import { fetchPokemonData } from '../store/thunks';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { 
    currentPage, 
    itemsPerPage, 
    totalPokemons, 
    currentMaxPages 
  } = useAppSelector(state => state.pokemon);

  const calculateTotalPages = () => {
    const maxAvailablePages = Math.ceil(totalPokemons / itemsPerPage);
    return Math.min(maxAvailablePages, currentMaxPages);
  };

  const totalPages = calculateTotalPages();

  const handlePageChange = (page: number | 'prev' | 'next') => {
    let newPage: number;
    
    if (page === 'prev') {
      newPage = Math.max(1, currentPage - 1);
    } else if (page === 'next') {
      newPage = Math.min(totalPages, currentPage + 1);
    } else {
      newPage = page;
    }

    dispatch(setCurrentPage(newPage));
    dispatch(fetchPokemonData());
  };

  // Calculate range of pages to show
  const getPageNumbers = () => {
    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(6, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 5, 2);
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = getPageNumbers();

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-8">
      {/* Previous button */}
      <button
        onClick={() => handlePageChange('prev')}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
        }`}
      >
        Previous
      </button>

      {/* First page */}
      <button
        onClick={() => handlePageChange(1)}
        className={`px-3 py-2 rounded-md ${
          currentPage === 1
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
        }`}
      >
        1
      </button>

      {/* Ellipsis after first page */}
      {startPage > 2 && (
        <button disabled className="px-3 py-2 rounded-md bg-white text-gray-700">
          ...
        </button>
      )}

      {/* Page numbers */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
        (page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 rounded-md ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Ellipsis before last page */}
      {endPage < totalPages - 1 && (
        <button disabled className="px-3 py-2 rounded-md bg-white text-gray-700">
          ...
        </button>
      )}

      {/* Last page */}
      {totalPages > 1 && (
        <button
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-2 rounded-md ${
            currentPage === totalPages
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          {totalPages}
        </button>
      )}

      {/* Next button */}
      <button
        onClick={() => handlePageChange('next')}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-md ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination; 