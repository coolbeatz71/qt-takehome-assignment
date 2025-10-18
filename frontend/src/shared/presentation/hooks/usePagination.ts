import { useMemo, useState, useEffect, useCallback } from 'react';

/**
 * Pagination hook props
 * @template T - Type of items in the data array
 * @property {T[]} data - Array of data to paginate
 * @property {number} itemsPerPage - Number of items per page
 */
interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage: number;
}

/**
 * Custom hook for managing pagination state and operations
 * @template T - Type of items in the data array
 * @param {UsePaginationProps<T>} props - Hook props
 * @returns {Object} Pagination state and methods
 * @returns {T[]} currentData - Current page data
 * @returns {number} totalPages - Total number of pages
 * @returns {number} currentPage - Current page number
 * @returns {number} totalItems - Total number of items
 * @returns {boolean} hasNext - Whether there is a next page
 * @returns {boolean} hasPrev - Whether there is a previous page
 * @returns {Function} goToPage - Navigate to a specific page
 * @returns {Function} nextPage - Navigate to next page
 * @returns {Function} prevPage - Navigate to previous page
 * @returns {Function} resetPage - Reset to first page
 */
export const usePagination = <T>({ data, itemsPerPage }: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize total pages calculation to avoid redundant computation
  const totalPages = useMemo(
    () => Math.ceil(data.length / itemsPerPage) || 1,
    [data.length, itemsPerPage]
  );

  // Reset to first page if current page exceeds total pages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const paginationData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    return {
      currentData,
      totalPages,
      currentPage,
      totalItems: data.length,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    };
  }, [data, itemsPerPage, currentPage, totalPages]);

  /**
   * Navigate to a specific page
   * @param {number} page - Page number to navigate to
   */
  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  /**
   * Navigate to the next page
   */
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  /**
   * Navigate to the previous page
   */
  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  /**
   * Reset to the first page
   */
  const resetPage = useCallback(() => setCurrentPage(1), []);

  return {
    ...paginationData,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
  };
};
