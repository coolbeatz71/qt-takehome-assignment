import { User } from '../../../../domain/entities/User';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { GetUserByIdQuery } from './GetUserByIdQuery';

/**
 * Get User By ID Query Handler
 * Retrieves a single user by ID (CQRS Query)
 */
export class GetUserByIdHandler {
  /**
   * Creates a new GetUserByIdHandler
   * @param {IUserRepository} userRepository - User repository for data access
   */
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Executes the get user by ID query
   * @param {GetUserByIdQuery} query - Query with user ID
   * @returns {Promise<User | null>} User if found, null otherwise
   */
  async handle(query: GetUserByIdQuery): Promise<User | null> {
    return await this.userRepository.findById(query.id);
  }
}
