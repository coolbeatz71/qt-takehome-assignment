import { describe, it, expect, beforeEach } from '@jest/globals';
import { DeleteUserHandler } from '../../../src/application/usecases/commands/delete-user/DeleteUserHandler';
import { TestFactory } from '../../utils/factories';
import { createMockUserRepository } from '../../utils/mocks';

describe('DeleteUserHandler', () => {
  let handler: DeleteUserHandler;
  let mockUserRepository: ReturnType<typeof createMockUserRepository>;

  beforeEach(() => {
    mockUserRepository = createMockUserRepository();
    handler = new DeleteUserHandler(mockUserRepository);
  });

  it('should delete user successfully', async () => {
    const user = TestFactory.createUser({ id: 1 });
    const command = TestFactory.deleteUserCommand({ id: 1 });
    mockUserRepository.findById.mockResolvedValue(user);

    await handler.handle(command);

    expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw when user not found', async () => {
    const command = TestFactory.deleteUserCommand({ id: 999 });
    mockUserRepository.findById.mockResolvedValue(null);

    await expect(handler.handle(command)).rejects.toThrow('User not found');
  });
});
