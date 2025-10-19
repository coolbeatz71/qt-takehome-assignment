import { GetAllUsersQuery } from './GetAllUsersQuery';
import { IUserRepository } from '../../../../application/repositories/IUserRepository';
import { User } from '../../../../domain/entities/User';

/**
 * Get All Users Query Handler
 * Retrieves all users from the system (CQRS Query)
 */
export class GetAllUsersHandler {
  /**
   * Creates a new GetAllUsersHandler
   * @param {IUserRepository} userRepository - User repository for data access
   */
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Executes the get all users query
   * @param {GetAllUsersQuery} _query - Query (no parameters)
   * @returns {Promise<User[]>} Array of all users
   */
  async handle(_query: GetAllUsersQuery): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
