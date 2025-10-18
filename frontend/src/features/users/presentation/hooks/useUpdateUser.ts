import { useState } from 'react';
import type { User } from '../../domain/entities/User.entity';
import type { UpdateUserDTO } from '../../domain/dto/UpdateUserDTO';
import { UpdateUserUseCase } from '../../application/usecases/commands/UpdateUser.usecase';
import { userRepository } from '../../infrastructure/repositories/UserRepository';

const updateUserUseCase = new UpdateUserUseCase(userRepository);

/**
 * Hook for updating an existing user
 * @returns {Object} Update user function, loading state, and error
 * @returns {Function} updateUser - Function to update a user
 * @returns {boolean} loading - Loading state
 * @returns {string | null} error - Error message if any
 */
export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (id: number, data: UpdateUserDTO): Promise<User | null> => {
    try {
      setLoading(true);
      setError(null);
      const user = await updateUserUseCase.execute(id, data);
      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateUser,
    loading,
    error,
  };
};