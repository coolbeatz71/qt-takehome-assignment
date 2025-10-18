import type { User } from '../../../domain/entities/User.entity';
import type { CreateUserDTO } from '../../../domain/dto/CreateUserDTO';
import { IUserRepository } from '../../repositories/IUserRepository';

/**
 * Create user use case for creating a new user in the system
 */
export class CreateUserUseCase {
  /**
   * Creates a new CreateUserUseCase instance
   * @param {IUserRepository} userRepository - User repository instance
   */
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Execute the use case to create a new user
   * @param {CreateUserDTO} data - User creation data
   * @returns {Promise<User>} Created user entity
   */
  async execute(data: CreateUserDTO): Promise<User> {
    return await this.userRepository.create(data);
  }
}
