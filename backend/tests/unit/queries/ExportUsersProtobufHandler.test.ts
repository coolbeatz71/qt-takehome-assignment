import { describe, it, expect, beforeEach } from '@jest/globals';
import { ExportUsersProtobufHandler } from '../../../src/application/usecases/queries/export-users-protobuf/ExportUsersProtobufHandler';
import { TestFactory } from '../../utils/factories';
import { createMockUserRepository, createMockProtobufService } from '../../utils/mocks';

describe('ExportUsersProtobufHandler', () => {
  let handler: ExportUsersProtobufHandler;
  let mockUserRepository: ReturnType<typeof createMockUserRepository>;
  let mockProtobufService: ReturnType<typeof createMockProtobufService>;

  beforeEach(() => {
    mockUserRepository = createMockUserRepository();
    mockProtobufService = createMockProtobufService();
    handler = new ExportUsersProtobufHandler(mockUserRepository, mockProtobufService);
  });

  it('should export users as protobuf', async () => {
    const users = [TestFactory.createUser(), TestFactory.createUser()];
    const buffer = Buffer.from('protobuf_data');
    const query = TestFactory.exportUsersProtobufQuery();
    
    mockUserRepository.findAll.mockResolvedValue(users);
    mockProtobufService.encodeUsers.mockResolvedValue(buffer);

    const result = await handler.handle(query);

    expect(Buffer.isBuffer(result)).toBe(true);
    expect(mockProtobufService.encodeUsers).toHaveBeenCalledWith(users);
  });

  it('should export empty buffer when no users', async () => {
    const buffer = Buffer.from('');
    const query = TestFactory.exportUsersProtobufQuery();
    
    mockUserRepository.findAll.mockResolvedValue([]);
    mockProtobufService.encodeUsers.mockResolvedValue(buffer);

    const result = await handler.handle(query);

    expect(Buffer.isBuffer(result)).toBe(true);
    expect(mockProtobufService.encodeUsers).toHaveBeenCalledWith([]);
  });
});
