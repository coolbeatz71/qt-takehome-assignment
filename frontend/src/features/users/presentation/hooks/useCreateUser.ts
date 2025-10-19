import { useState } from 'react';
import type { User } from '../../domain/entities/User.entity';
import type { CreateUserDTO } from '../../domain/dto/CreateUserDTO';
import { CreateUserUseCase } from '../../application/usecases/commands/CreateUser.usecase';
import { userRepository } from '../../infrastructure/repositories/UserRepository';

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
      setError(err instanceof Error ? err.message : 'Failed to create user');
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