import React, { useState, useEffect } from 'react';
import type { User } from '../../../domain/entities/User';
import { Card } from '../../../../../shared/presentation/components';
import {
  UserTableHeader,
  UserDesktopTable,
  UserMobileList,
  UserTablePagination,
  UserTableSkeleton,
  UserMobileSkeleton,
  EmptyState
} from '../presentation/tables';
import { usePagination } from '../../../../../shared/presentation/hooks/usePagination';

/**
 * User table container component props
 * @property {User[]} users - Array of users
 * @property {boolean} loading - Loading state
 * @property {Function} onEdit - Edit user handler
 * @property {Function} onDelete - Delete user handler
 * @property {Function} onCreate - Create user handler
 */
interface UserTableContainerProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
}

const ITEMS_PER_PAGE = 5;

/**
 * User table container with search, pagination and responsive layout
 * @param {UserTableContainerProps} props - Component props
 * @returns {JSX.Element} User table container
 */
export const UserTableContainer: React.FC<UserTableContainerProps> = ({
  users,
  loading,
  onEdit,
  onDelete,
  onCreate,
}) => {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(query), 200);
    return () => clearTimeout(id);
  }, [query]);

  const filteredUsers = users.filter(user => {
    const q = searchTerm.toLowerCase();
    return user.email.toLowerCase().includes(q) || user.role.toLowerCase().includes(q);
  });

  const {
    currentData: paginatedUsers,
    totalPages,
    currentPage,
    totalItems,
    hasNext,
    hasPrev,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination({ data: filteredUsers, itemsPerPage: ITEMS_PER_PAGE });

  if (loading) {
    return (
      <Card>
        <Card.Header>
          <UserTableHeader
            totalUsers={0}
            searchQuery={query}
            onSearchChange={setQuery}
            onCreateClick={onCreate}
          />
        </Card.Header>
        <Card.Content>
          <UserTableSkeleton />
          <UserMobileSkeleton />
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <UserTableHeader
          totalUsers={totalItems}
          searchQuery={query}
          onSearchChange={setQuery}
          onCreateClick={onCreate}
        />
      </Card.Header>
      <Card.Content>
        {paginatedUsers.length === 0 ? (
          <EmptyState isSearching={!!searchTerm} />
        ) : (
          <>
            <UserDesktopTable users={paginatedUsers} onEdit={onEdit} onDelete={onDelete} />
            <UserMobileList users={paginatedUsers} onEdit={onEdit} onDelete={onDelete} />

            {totalPages > 1 && (
              <UserTablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                hasNext={hasNext}
                hasPrev={hasPrev}
                onNextPage={nextPage}
                onPrevPage={prevPage}
                onGoToPage={goToPage}
              />
            )}
          </>
        )}
      </Card.Content>
    </Card>
  );
};
