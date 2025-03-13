import { useCallback, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useAppRedux';
import { 
  setSearchTerm, 
  setSortOrder, 
  setItemsPerPage, 
  setCurrentMaxPages,
  setCurrentPage 
} from '../store/pokemonSlice';
import { fetchPokemonData } from '../store/thunks';
import debounce from 'lodash/debounce';

const Controls = () => {
  const dispatch = useAppDispatch();
  const {
    searchTerm,
    sortOrder,
    itemsPerPage,
    currentMaxPages,
    totalPokemons
  } = useAppSelector(state => state.pokemon);

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      dispatch(setSearchTerm(value));
      dispatch(setCurrentPage(1));
      dispatch(fetchPokemonData());
    }, 300),
    [dispatch]
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOrder(e.target.value));
  };

  const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    if (value) {
      dispatch(setItemsPerPage(value));
      dispatch(setCurrentPage(1));
      dispatch(fetchPokemonData());
    }
  };

  const handleMaxPagesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    if (value) {
      const maxAvailablePages = Math.ceil(totalPokemons / itemsPerPage);
      const newMaxPages = Math.min(value, maxAvailablePages);
      dispatch(setCurrentMaxPages(newMaxPages));
      dispatch(setCurrentPage(1));
      dispatch(fetchPokemonData());
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search Pokemon..."
          onChange={handleSearch}
          defaultValue={searchTerm}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Sort Order Select */}
      <div className="relative">
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
        >
          <option value="">Sort by...</option>
          <option value="height-low">Height: Low to High</option>
          <option value="height-high">Height: High to Low</option>
          <option value="weight-low">Weight: Low to High</option>
          <option value="weight-high">Weight: High to Low</option>
          <option value="order-low">Order: Low to High</option>
          <option value="order-high">Order: High to Low</option>
        </select>
      </div>

      {/* Items Per Page Select */}
      <div className="relative">
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
        >
          <option value="">Cards per page</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      {/* Max Pages Select */}
      <div className="relative">
        <select
          value={currentMaxPages}
          onChange={handleMaxPagesChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
        >
          <option value="">Max pages</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
};

export default Controls; 