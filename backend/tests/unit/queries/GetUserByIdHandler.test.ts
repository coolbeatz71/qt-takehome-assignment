import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetUserByIdHandler } from '../../../src/application/usecases/queries/get-user-by-id/GetUserByIdHandler';
import { TestFactory } from '../../utils/factories';
import { createMockUserRepository } from '../../utils/mocks';

describe('GetUserByIdHandler', () => {
  let handler: GetUserByIdHandler;
  let mockUserRepository: ReturnType<typeof createMockUserRepository>;

  beforeEach(() => {
    mockUserRepository = createMockUserRepository();
    handler = new GetUserByIdHandler(mockUserRepository);
  });

  it('should return user by id', async () => {
    const user = TestFactory.createUser({ id: 1 });
    const query = TestFactory.getUserByIdQuery({ id: 1 });
    mockUserRepository.findById.mockResolvedValue(user);

    const result = await handler.handle(query);

    expect(result).toEqual(user);
  });

  it('should return null when user not found', async () => {
    const query = TestFactory.getUserByIdQuery({ id: 999 });
    mockUserRepository.findById.mockResolvedValue(null);

    const result = await handler.handle(query);

    expect(result).toBeNull();
  });
});
