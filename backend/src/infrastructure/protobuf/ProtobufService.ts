import protobuf from 'protobufjs';
import path from 'path';
import { User } from '../../domain/entities/User';
import { IProtobufService } from '../../domain/services/IProtobufService';

/**
 * Protocol Buffer Service Implementation
 * Handles user serialization/deserialization using Protocol Buffers
 */
export class ProtobufService implements IProtobufService {
  private protoRoot: protobuf.Root | null = null;
  private readonly protoPath: string;

  /**
   * Creates a new ProtobufService instance
   * @param {string} protoPath - Path to the .proto schema file
   */
  constructor(protoPath: string = path.join(__dirname, 'schemas/user.proto')) {
    this.protoPath = protoPath;
  }

  /**
   * Initializes the protobuf service by loading the schema
   * Must be called before using other methods
   */
  async initialize(): Promise<void> {
    await this.loadProtoSchema();
  }

  /**
   * Loads the Protocol Buffer schema
   * @private
   * @returns {Promise<protobuf.Root>} Loaded protobuf root
   * @throws {Error} If schema loading fails
   */
  private async loadProtoSchema(): Promise<protobuf.Root> {
    if (this.protoRoot) {
      return this.protoRoot;
    }

    try {
      this.protoRoot = await protobuf.load(this.protoPath);
      return this.protoRoot;
    } catch (error) {
      throw new Error('Failed to load Protocol Buffer schema');
    }
  }

  /**
   * Encodes an array of users to Protocol Buffer binary format
   * @param {User[]} users - Array of users to encode
   * @returns {Promise<Buffer>} Binary protobuf data
   * @throws {Error} If encoding fails
   */
  async encodeUsers(users: User[]): Promise<Buffer> {
    try {
      const root = await this.loadProtoSchema();
      const UserList = root.lookupType('UserList');

      const payload = {
        users: users.map(user => ({
          id: user.id,
          email: user.email,
          role: user.role,
          status: user.status,
          createdAt: user.createdAt,
          signature: user.signature,
        })),
        total: users.length,
      };

      const errMsg = UserList.verify(payload);
      if (errMsg) {
        throw new Error(`Payload verification failed: ${errMsg}`);
      }

      const message = UserList.create(payload);
      const buffer = UserList.encode(message).finish();

      return Buffer.from(buffer);
    } catch (error) {
      throw new Error('Failed to encode users to Protocol Buffer format');
    }
  }

  /**
   * Decodes Protocol Buffer binary data to User entities
   * @param {Buffer} buffer - Binary protobuf data
   * @returns {Promise<User[]>} Array of decoded users
   * @throws {Error} If decoding fails
   */
  async decodeUsers(buffer: Buffer): Promise<User[]> {
    try {
      const root = await this.loadProtoSchema();
      const UserList = root.lookupType('UserList');

      const message = UserList.decode(buffer);
      const object = UserList.toObject(message, {
        longs: Number,
        enums: String,
        bytes: String,
      }) as any;

      const rawUsers = object.users || [];

      return rawUsers.map((u: any) => new User(
        u.id,
        u.email,
        u.role,
        u.status,
        u.createdAt,
        u.signature
      ));
    } catch (error) {
      throw new Error('Failed to decode Protocol Buffer data');
    }
  }
}
