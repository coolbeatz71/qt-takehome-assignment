import type { IUserRepository } from '../../repositories/IUserRepository';
import type { User } from '../../../domain/entities/User';

/**
 * Get user by ID use case for retrieving a single user
 */
export class GetUserByIdUseCase {
  /**
   * Creates a new GetUserByIdUseCase instance
   * @param {IUserRepository} userRepository - User repository instance
   */
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Execute the use case to fetch a user by ID
   * @param {number} id - User ID
   * @returns {Promise<User>} User entity
   */
  async execute(id: number): Promise<User> {
    return await this.userRepository.getById(id);
  }
}
