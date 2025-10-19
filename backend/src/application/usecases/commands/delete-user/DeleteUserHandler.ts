import { IUserRepository } from '../../../repositories/IUserRepository';
import { DeleteUserCommand } from './DeleteUserCommand';
import { errorMessages } from '../../../../shared/constants/error-messages';

/**
 * Delete User Command Handler
 * Handles user deletion (CQRS Command)
 */
export class DeleteUserHandler {
  /**
   * Creates a new DeleteUserHandler
   * @param {IUserRepository} userRepository - User repository for persistence
   */
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Executes the delete user command
   * @param {DeleteUserCommand} command - User deletion command
   * @returns {Promise<boolean>} True if deleted successfully
   * @throws {Error} If user not found
   */
  async handle(command: DeleteUserCommand): Promise<boolean> {
    // Check if user exists
    const existingUser = await this.userRepository.findById(command.id);
    if (!existingUser) {
      throw new Error(errorMessages.user.notFound);
    }

    // Delete user
    return await this.userRepository.delete(command.id);
  }
}
