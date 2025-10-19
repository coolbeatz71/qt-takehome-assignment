import { describe, it, expect, beforeEach } from '@jest/globals';
import { UpdateUserHandler } from '../../../src/application/usecases/commands/update-user/UpdateUserHandler';
import { TestFactory } from '../../utils/factories';
import { createMockUserRepository, createMockCryptoService } from '../../utils/mocks';
import { UserRole, UserStatus } from '../../../src/domain/enums/UserEnums';

describe('UpdateUserHandler', () => {
  let handler: UpdateUserHandler;
  let mockUserRepository: ReturnType<typeof createMockUserRepository>;
  let mockCryptoService: ReturnType<typeof createMockCryptoService>;

  beforeEach(() => {
    mockUserRepository = createMockUserRepository();
    mockCryptoService = createMockCryptoService();
    handler = new UpdateUserHandler(mockUserRepository, mockCryptoService);
  });

  it('should update user successfully', async () => {
    const user = TestFactory.createUser({ id: 1 });
    const command = TestFactory.updateUserCommand({ 
      id: 1, 
      email: 'new@test.com', 
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE       
    });
    
    mockUserRepository.findById.mockResolvedValue(user);
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.update.mockResolvedValue(user);

    const result = await handler.handle(command);

    expect(result).toEqual(user);
  });

  it('should throw when user not found', async () => {
    const command = TestFactory.updateUserCommand({ id: 999 });
    mockUserRepository.findById.mockResolvedValue(null);

    await expect(handler.handle(command)).rejects.toThrow('User not found');
  });
});
