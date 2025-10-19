import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetAllUsersHandler } from '../../../src/application/usecases/queries/get-all-users/GetAllUsersHandler';
import { TestFactory } from '../../utils/factories';
import { createMockUserRepository } from '../../utils/mocks';

describe('GetAllUsersHandler', () => {
  let handler: GetAllUsersHandler;
  let mockUserRepository: ReturnType<typeof createMockUserRepository>;

  beforeEach(() => {
    mockUserRepository = createMockUserRepository();
    handler = new GetAllUsersHandler(mockUserRepository);
  });

  it('should return all users', async () => {
    const users = [TestFactory.createUser(), TestFactory.createUser()];
    const query = TestFactory.getAllUsersQuery();
    mockUserRepository.findAll.mockResolvedValue(users);

    const result = await handler.handle(query);

    expect(result).toEqual(users);
  });

  it('should return empty array when no users', async () => {
    const query = TestFactory.getAllUsersQuery();
    mockUserRepository.findAll.mockResolvedValue([]);

    const result = await handler.handle(query);

    expect(result).toEqual([]);
  });
});
