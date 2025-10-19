import { User } from '../entities/User';

/**
 * Protobuf Service Interface
 * Defines contract for Protocol Buffer serialization (Dependency Inversion Principle)
 */
export interface IProtobufService {
  /**
   * Encodes users to Protocol Buffer format
   * @param {User[]} users - Array of users to encode
   * @returns {Promise<Buffer>} Binary protobuf data
   */
  encodeUsers(users: User[]): Promise<Buffer>;

  /**
   * Decodes Protocol Buffer data to users
   * @param {Buffer} buffer - Binary protobuf data
   * @returns {Promise<User[]>} Decoded users
   */
  decodeUsers(buffer: Buffer): Promise<User[]>;
}
