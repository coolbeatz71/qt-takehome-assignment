import type { IUserRepository } from '../../repositories/IUserRepository';
import type { User } from '../../../domain/entities/User.entity';

/**
 * Get all users use case for retrieving all users from the system
 */
export class GetAllUsersUseCase {
  /**
   * Creates a new GetAllUsersUseCase instance
   * @param {IUserRepository} userRepository - User repository instance
   */
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Execute the use case to fetch all users
   * @returns {Promise<User[]>} Array of users
   */
  async execute(): Promise<User[]> {
    return await this.userRepository.getAll();
  }
}
