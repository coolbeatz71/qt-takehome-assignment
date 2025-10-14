import { User } from '../../../../domain/entities/User';
import { ICryptoService } from '../../../../domain/services/ICryptoService';
import { Email } from '../../../../domain/value-objects/Email';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { CreateUserCommand } from './CreateUserCommand';
import { CreateUserValidator } from './CreateUserValidator';


/**
 * Create User Command Handler
 * Handles user creation with email signing (CQRS Command)
 */
export class CreateUserHandler {
  private readonly validator: CreateUserValidator;

  /**
   * Creates a new CreateUserHandler
   * @param {IUserRepository} userRepository - User repository for persistence
   * @param {ICryptoService} cryptoService - Crypto service for email signing
   */
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly cryptoService: ICryptoService
  ) {
    this.validator = new CreateUserValidator();
  }

  /**
   * Executes the create user command
   * @param {CreateUserCommand} command - User creation command
   * @returns {Promise<User>} Created user
   * @throws {Error} If validation fails, email is invalid, or already exists
   */
  async handle(command: CreateUserCommand): Promise<User> {
    // Validate command
    const validationResult = this.validator.validate(command);
    if (!validationResult.isValid) {
      throw new Error(validationResult.errors.join(', '));
    }

    // Validate email using value object
    const email = new Email(command.email);

    // Check for duplicate email
    const existingUser = await this.userRepository.findByEmail(email.toString());
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Sign email using crypto service
    const signature = this.cryptoService.signEmail(email.toString());

    // Create user
    const user = await this.userRepository.create(
      email.toString(),
      command.role,
      command.status,
      signature
    );

    return user;
  }
}
