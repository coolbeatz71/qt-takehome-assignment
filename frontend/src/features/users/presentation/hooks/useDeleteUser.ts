import { useState } from 'react';
import { DeleteUserUseCase } from '../../application/usecases/commands/DeleteUserUsecase';
import { userRepository } from '../../infrastructure/repositories/UserRepository';
import { errorMessages } from '../../../../shared/constants/error-messages';

const deleteUserUseCase = new DeleteUserUseCase(userRepository);

/**
 * Hook for deleting a user
 * @returns {Object} Delete user function, loading state, and error
 * @returns {Function} deleteUser - Function to delete a user
 * @returns {boolean} loading - Loading state
 * @returns {string | null} error - Error message if any
 */
export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (id: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await deleteUserUseCase.execute(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : errorMessages.user.deleteFailed);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteUser,
    loading,
    error,
  };
};
