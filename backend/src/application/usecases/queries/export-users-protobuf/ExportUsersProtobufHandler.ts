import { IProtobufService } from '../../../../domain/services/IProtobufService';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { ExportUsersProtobufQuery } from './ExportUsersProtobufQuery';

/**
 * Export Users Protobuf Query Handler
 * Exports all users in Protocol Buffer format (CQRS Query)
 */
export class ExportUsersProtobufHandler {
  /**
   * Creates a new ExportUsersProtobufHandler
   * @param {IUserRepository} userRepository - User repository for data access
   * @param {IProtobufService} protobufService - Protobuf service for serialization
   */
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly protobufService: IProtobufService
  ) {}

  /**
   * Executes the export users protobuf query
   * @param {ExportUsersProtobufQuery} _query - Query (no parameters)
   * @returns {Promise<Buffer>} Binary protobuf data of all users
   */
  async handle(_query: ExportUsersProtobufQuery): Promise<Buffer> {
    const users = await this.userRepository.findAll();
    return await this.protobufService.encodeUsers(users);
  }
}
