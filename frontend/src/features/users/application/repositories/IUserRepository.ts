import type { User } from '../../domain/entities/User.entity';
import type { CreateUserDTO } from '../../domain/dto/CreateUserDTO';
import type { UpdateUserDTO } from '../../domain/dto/UpdateUserDTO';

/**
 * User repository interface defining contract for user data access operations
 * Provides abstraction layer for CRUD operations, protobuf export, and cryptographic key retrieval
 */
export interface IUserRepository {
  /**
   * Fetch all users from the system
   * @returns {Promise<User[]>} Array of users
   */
  getAll(): Promise<User[]>;

  /**
   * Fetch a single user by ID
   * @param {number} id - User ID
   * @returns {Promise<User>} User entity
   */
  getById(id: number): Promise<User>;

  /**
   * Create a new user
   * @param {CreateUserDTO} data - User creation data
   * @returns {Promise<User>} Created user entity
   */
  create(data: CreateUserDTO): Promise<User>;

  /**
   * Update an existing user
   * @param {number} id - User ID
   * @param {UpdateUserDTO} data - User update data
   * @returns {Promise<User>} Updated user entity
   */
  update(id: number, data: UpdateUserDTO): Promise<User>;

  /**
   * Delete a user by ID
   * @param {number} id - User ID
   * @returns {Promise<void>}
   */
  delete(id: number): Promise<void>;

  /**
   * Export users in protobuf format
   * @returns {Promise<ArrayBuffer>} Protobuf encoded users data
   */
  exportProtobuf(): Promise<ArrayBuffer>;

  /**
   * Get public key for signature verification
   * @returns {Promise<{publicKey: string; algorithm: string; curve: string; hash: string}>} Public key data
   */
  getPublicKey(): Promise<{
    publicKey: string;
    algorithm: string;
    curve: string;
    hash: string;
  }>;
}
