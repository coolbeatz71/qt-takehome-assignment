import type { IUserRepository } from '../../application/repositories/IUserRepository';
import type { User } from '../../domain/entities/User.entity';
import type { CreateUserDTO } from '../../domain/dto/CreateUserDTO';
import type { UpdateUserDTO } from '../../domain/dto/UpdateUserDTO';
import { httpClient } from '../../../../shared/infrastructure/http/HttpClient';
import type { ApiResponse } from '../../../../shared/infrastructure/http/types/ApiResponse';

/**
 * User repository implementation for HTTP-based user data access
 * Implements IUserRepository interface using REST API calls
 */
export class UserRepository implements IUserRepository {
  /**
   * Fetch all users from the system
   * @returns {Promise<User[]>} Array of users
   */
  async getAll(): Promise<User[]> {
    const response = await httpClient.get<ApiResponse<User[]>>('/api/users');
    return response.data.data!;
  }

  /**
   * Fetch a single user by ID
   * @param {number} id - User ID
   * @returns {Promise<User>} User entity
   */
  async getById(id: number): Promise<User> {
    const response = await httpClient.get<ApiResponse<User>>(`/api/users/${id}`);
    return response.data.data!;
  }

  /**
   * Create a new user
   * @param {CreateUserDTO} data - User creation data
   * @returns {Promise<User>} Created user entity
   */
  async create(data: CreateUserDTO): Promise<User> {
    const response = await httpClient.post<ApiResponse<User>>('/api/users', data);
    return response.data.data!;
  }

  /**
   * Update an existing user
   * @param {number} id - User ID
   * @param {UpdateUserDTO} data - User update data
   * @returns {Promise<User>} Updated user entity
   */
  async update(id: number, data: UpdateUserDTO): Promise<User> {
    const response = await httpClient.put<ApiResponse<User>>(`/api/users/${id}`, data);
    return response.data.data!;
  }

  /**
   * Delete a user by ID
   * @param {number} id - User ID
   * @returns {Promise<void>}
   */
  async delete(id: number): Promise<void> {
    await httpClient.delete<ApiResponse<null>>(`/api/users/${id}`);
  }

  /**
   * Export users in protobuf format
   * @returns {Promise<ArrayBuffer>} Protobuf encoded users data
   */
  async exportProtobuf(): Promise<ArrayBuffer> {
    const response = await httpClient.get('/api/users/export', {
      responseType: 'arraybuffer',
      headers: { Accept: 'application/x-protobuf' },
    });
    return response.data;
  }

  /**
   * Get public key for signature verification
   * @returns {Promise<{publicKey: string; algorithm: string; curve: string; hash: string}>} Public key data
   */
  async getPublicKey(): Promise<{
    publicKey: string;
    algorithm: string;
    curve: string;
    hash: string;
  }> {
    const response = await httpClient.get<ApiResponse<{
      publicKey: string;
      algorithm: string;
      curve: string;
      hash: string;
    }>>('/api/public-key');
    return response.data.data!;
  }
}

/**
 * Default user repository instance
 */
export const userRepository = new UserRepository();
