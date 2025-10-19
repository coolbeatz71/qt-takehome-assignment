import type { IUserRepository } from '../../repositories/IUserRepository';
import type { User } from '../../../domain/entities/User.entity';
import { protobufService } from '../../../infrastructure/services/ProtobufService';
import { cryptoService } from '../../../infrastructure/services/CryptoService';

/**
 * Get verified users use case
 * Fetches users via protobuf and verifies their cryptographic signatures
 */
export class GetVerifiedUsersUseCase {
  /**
   * Creates a new GetVerifiedUsersUseCase instance
   * @param {IUserRepository} userRepository - User repository instance
   */
  constructor(private readonly userRepository: IUserRepository) {}

  /**
   * Execute the use case to get verified users
   * 1. Fetch protobuf data from /api/users/export
   * 2. Decode protobuf to User[]
   * 3. Fetch public key
   * 4. Verify signatures and filter to only valid users
   * @returns {Promise<User[]>} Array of verified users
   */
  async execute(): Promise<User[]> {
    const protobufBuffer = await this.userRepository.exportProtobuf();

    const decodedUsers = protobufService.decodeUsers(protobufBuffer);

    const publicKeyData = await this.userRepository.getPublicKey();

    const verifiedUsers = await cryptoService.verifyAndFilterUsers(
      decodedUsers,
      publicKeyData.publicKey
    );

    return verifiedUsers;
  }
}
