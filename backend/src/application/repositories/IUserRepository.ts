import { User } from "../../domain/entities/User";
import { UserRole, UserStatus } from "../../domain/enums/UserEnums";

/**
 * User Repository Interface
 * Defines contract for user data persistence
 */
export interface IUserRepository {
  /**
   * Retrieves all users
   * @returns {Promise<User[]>} Array of all users
   */
  findAll(): Promise<User[]>;

  /**
   * Finds a user by ID
   * @param {number} id - User ID
   * @returns {Promise<User | null>} User if found, null otherwise
   */
  findById(id: number): Promise<User | null>;

  /**
   * Finds a user by email
   * @param {string} email - User email
   * @returns {Promise<User | null>} User if found, null otherwise
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Creates a new user
   * @param {string} email - User email
   * @param {UserRole} role - User role
   * @param {UserStatus} status - User status
   * @param {string} signature - Email signature
   * @returns {Promise<User>} Created user
   */
  create(email: string, role: UserRole, status: UserStatus, signature: string): Promise<User>;

  /**
   * Updates an existing user
   * @param {number} id - User ID
   * @param {Partial<{email: string, role: UserRole, status: UserStatus, signature: string}>} updates - Fields to update
   * @returns {Promise<User>} Updated user
   */
  update(id: number, updates: Partial<{email: string, role: UserRole, status: UserStatus, signature: string}>): Promise<User>;

  /**
   * Deletes a user
   * @param {number} id - User ID
   * @returns {Promise<boolean>} True if deleted
   */
  delete(id: number): Promise<boolean>;

  /**
   * Gets user creation statistics for the last 7 days
   * @returns {Promise<Array<{date: string, count: number}>>} Daily stats
   */
  getStats(): Promise<Array<{date: string, count: number}>>;
}
