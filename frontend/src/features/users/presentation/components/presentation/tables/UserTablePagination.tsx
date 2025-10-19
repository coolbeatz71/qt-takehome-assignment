import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../../../../../shared';

/**
 * User table pagination component props
 * @property {number} currentPage - Current page number
 * @property {number} totalPages - Total number of pages
 * @property {number} totalItems - Total number of items
 * @property {number} itemsPerPage - Items per page
 * @property {boolean} hasNext - Has next page
 * @property {boolean} hasPrev - Has previous page
 * @property {Function} onNextPage - Next page handler
 * @property {Function} onPrevPage - Previous page handler
 * @property {Function} onGoToPage - Go to page handler
 */
interface UserTablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  onGoToPage: (page: number) => void;
}

/**
 * Pagination component for user table
 * @param {UserTablePaginationProps} props - Component props
 * @returns {JSX.Element} Pagination component
 */
export const UserTablePagination: React.FC<UserTablePaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  hasNext,
  hasPrev,
  onNextPage,
  onPrevPage,
  onGoToPage,
}) => {
  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="text-sm text-gray-700 dark:text-gray-300">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrevPage}
          disabled={!hasPrev}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "primary" : "ghost"}
              size="sm"
              onClick={() => onGoToPage(page)}
              className="h-8 w-8 p-0 text-sm"
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onNextPage}
          disabled={!hasNext}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
