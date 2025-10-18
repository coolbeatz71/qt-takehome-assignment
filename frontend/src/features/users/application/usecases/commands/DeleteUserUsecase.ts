import type { IUserRepository } from '../../repositories/IUserRepository';

/**
 * Delete user use case for removing a user from the system
 */
export class DeleteUserUseCase {
  /**
   * Creates a new DeleteUserUseCase instance
   * @param {IUserRepository} userRepository - User repository instance
   */
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Execute the use case to delete a user
   * @param {number} id - User ID
   * @returns {Promise<void>}
   */
  async execute(id: number): Promise<void> {
    return await this.userRepository.delete(id);
  }
}
