import { useState } from 'react';
import type { User } from '../../domain/entities/User';
import type { CreateUserDTO } from '../../domain/dto/CreateUserDTO';
import { CreateUserUseCase } from '../../application/usecases/commands/CreateUserUsecase';
import { userRepository } from '../../infrastructure/repositories/UserRepository';
import { errorMessages } from '../../../../shared/constants/error-messages';

const createUserUseCase = new CreateUserUseCase(userRepository);

/**
 * Hook for creating a new user
 * @returns {Object} Create user function, loading state, and error
 * @returns {Function} createUser - Function to create a user
 * @returns {boolean} loading - Loading state
 * @returns {string | null} error - Error message if any
 */
export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (data: CreateUserDTO): Promise<User | null> => {
    try {
      setLoading(true);
      setError(null);
      const user = await createUserUseCase.execute(data);
      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : errorMessages.user.createFailed);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createUser,
    loading,
    error,
  };
};
