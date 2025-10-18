import { useState, useEffect } from 'react';
import type { User } from '../../domain/entities/User';
import { GetVerifiedUsersUseCase } from '../../application/usecases/queries/GetVerifiedUsersUsecase';
import { userRepository } from '../../infrastructure/repositories/UserRepository';
import { errorMessages } from '../../../../shared/constants/error-messages';

const getVerifiedUsersUseCase = new GetVerifiedUsersUseCase(userRepository);

/**
 * Hook for fetching verified users
 * Fetches users via protobuf and verifies cryptographic signatures
 * @returns {Object} Users data, loading state, and error
 * @returns {User[]} users - Array of verified users only
 * @returns {boolean} loading - Loading state
 * @returns {string | null} error - Error message if any
 * @returns {Function} refetch - Function to refetch users
 */
export const useGetUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getVerifiedUsersUseCase.execute();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : errorMessages.user.fetchAllFailed);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refetch: fetchUsers,
  };
};
