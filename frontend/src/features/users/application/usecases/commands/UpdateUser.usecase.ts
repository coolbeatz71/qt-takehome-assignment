import type { User } from '../../../domain/entities/User.entity';
import type { UpdateUserDTO } from '../../../domain/dto/UpdateUserDTO';
import { IUserRepository } from '../../repositories/IUserRepository';

/**
 * Update user use case for updating an existing user
 */
export class UpdateUserUseCase {
  /**
   * Creates a new UpdateUserUseCase instance
   * @param {IUserRepository} userRepository - User repository instance
   */
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Execute the use case to update a user
   * @param {number} id - User ID
   * @param {UpdateUserDTO} data - User update data
   * @returns {Promise<User>} Updated user entity
   */
  async execute(id: number, data: UpdateUserDTO): Promise<User> {
    return await this.userRepository.update(id, data);
  }
}
