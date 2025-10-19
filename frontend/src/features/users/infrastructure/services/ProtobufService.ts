import protobuf from 'protobufjs';
import type { User } from '../../domain/entities/User.entity';

/**
 * Protobuf service for decoding user data from Protocol Buffer format
 */
export class ProtobufService {
  private readonly schema: protobuf.Root;

  constructor() {
    this.schema = this.createSchema();
  }

  /**
   * Create and initialize Protocol Buffer schema
   * @returns {protobuf.Root} Protobuf root instance
   */
  private createSchema(): protobuf.Root {
    const root = new protobuf.Root();

    const UserType = new protobuf.Type('User')
      .add(new protobuf.Field('id', 1, 'int32'))
      .add(new protobuf.Field('email', 2, 'string'))
      .add(new protobuf.Field('role', 3, 'string'))
      .add(new protobuf.Field('status', 4, 'string'))
      .add(new protobuf.Field('createdAt', 5, 'string'))
      .add(new protobuf.Field('signature', 6, 'string'));

    const UserListType = new protobuf.Type('UserList')
      .add(new protobuf.Field('users', 1, 'User', 'repeated'))
      .add(new protobuf.Field('total', 2, 'int32'));

    root.add(UserType);
    root.add(UserListType);

    return root;
  }

  /**
   * Decode Protocol Buffer binary data to User array
   * @param {ArrayBuffer} buffer - Protobuf encoded data
   * @returns {User[]} Array of users
   */
  decodeUsers(buffer: ArrayBuffer): User[] {
    const UserList = this.schema.lookupType('UserList');
    const message = UserList.decode(new Uint8Array(buffer));
    const decoded = UserList.toObject(message, {
      longs: Number,
      enums: String,
      bytes: String,
    }) as { users?: User[] };

    return decoded.users || [];
  }
}

export const protobufService = new ProtobufService();
