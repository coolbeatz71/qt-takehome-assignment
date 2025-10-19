import { describe, it, expect, beforeEach } from '@jest/globals';
import { CreateUserHandler } from '../../../src/application/usecases/commands/create-user/CreateUserHandler';
import { TestFactory } from '../../utils/factories';
import { createMockUserRepository, createMockCryptoService } from '../../utils/mocks';
import { errorMessages } from '../../../src/shared/constants/error-messages';

describe('CreateUserHandler', () => {
  let handler: CreateUserHandler;
  let mockUserRepository: ReturnType<typeof createMockUserRepository>;
  let mockCryptoService: ReturnType<typeof createMockCryptoService>;

  beforeEach(() => {
    mockUserRepository = createMockUserRepository();
    mockCryptoService = createMockCryptoService();
    handler = new CreateUserHandler(mockUserRepository, mockCryptoService);
  });

  it('should create user successfully', async () => {
    const command = TestFactory.createUserCommand();
    const user = TestFactory.createUser();
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue(user);

    const result = await handler.handle(command);

    expect(result).toEqual(user);
    expect(mockCryptoService.signEmail).toHaveBeenCalled();
  });

  it('should throw when email exists', async () => {
    const command = TestFactory.createUserCommand();
    mockUserRepository.findByEmail.mockResolvedValue(TestFactory.createUser());

    await expect(handler.handle(command)).rejects.toThrow(errorMessages.user.duplicateEmail);
  });
});
