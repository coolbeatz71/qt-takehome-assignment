import { User } from '../../../../domain/entities/User';
import { ICryptoService } from '../../../../domain/services/ICryptoService';
import { Email } from '../../../../domain/value-objects/Email';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { UpdateUserCommand } from './UpdateUserCommand';
import { UpdateUserValidator } from './UpdateUserValidator';
import { errorMessages } from '../../../../shared/constants/error-messages';

/**
 * Update User Command Handler
 * Handles user updates with email re-signing if email changes (CQRS Command)
 */
export class UpdateUserHandler {
  private readonly validator: UpdateUserValidator;

  /**
   * Creates a new UpdateUserHandler
   * @param {IUserRepository} userRepository - User repository for persistence
   * @param {ICryptoService} cryptoService - Crypto service for email signing
   */
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cryptoService: ICryptoService
  ) {
    this.validator = new UpdateUserValidator();
  }

  /**
   * Executes the update user command
   * @param {UpdateUserCommand} command - User update command
   * @returns {Promise<User>} Updated user
   * @throws {Error} If validation fails, user not found, email invalid, or email already exists
   */
  async handle(command: UpdateUserCommand): Promise<User> {
    // Validate command
    const validationResult = this.validator.validate(command);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join(', '));
    }

    // Check if user exists
    const existingUser = await this.userRepository.findById(command.id);
    if (!existingUser) {
      throw new Error(errorMessages.user.notFound);
    }

    const updates: any = {};

    // Handle email update
    if (command.email !== undefined) {
      const email = new Email(command.email);

      // Check for duplicate email (excluding current user)
      const userWithEmail = await this.userRepository.findByEmail(email.toString());
      if (userWithEmail && userWithEmail.id !== command.id) {
        throw new Error(errorMessages.user.duplicateEmail);
      }

      updates.email = email.toString();
      // Re-sign email if changed
      updates.signature = this.cryptoService.signEmail(email.toString());
    }

    // Handle role and status updates
    if (command.role !== undefined) {
      updates.role = command.role;
    }
    if (command.status !== undefined) {
      updates.status = command.status;
    }

    // Update user
    const updatedUser = await this.userRepository.update(command.id, updates);

    return updatedUser;
  }
}
