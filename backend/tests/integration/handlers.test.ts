import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CreateUserHandler } from '../../src/application/usecases/commands/create-user/CreateUserHandler';
import { UpdateUserHandler } from '../../src/application/usecases/commands/update-user/UpdateUserHandler';
import { DeleteUserHandler } from '../../src/application/usecases/commands/delete-user/DeleteUserHandler';
import { GetAllUsersHandler } from '../../src/application/usecases/queries/get-all-users/GetAllUsersHandler';
import { GetUserByIdHandler } from '../../src/application/usecases/queries/get-user-by-id/GetUserByIdHandler';
import { GetUserStatsHandler } from '../../src/application/usecases/queries/get-user-stats/GetUserStatsHandler';
import { ExportUsersProtobufHandler } from '../../src/application/usecases/queries/export-users-protobuf/ExportUsersProtobufHandler';
import { GetPublicKeyHandler } from '../../src/application/usecases/queries/get-public-key/GetPublicKeyHandler';
import { TestFactory } from '../utils/factories';
import {
  createMockUserRepository,
  createMockCryptoService,
  createMockProtobufService,
} from '../utils/mocks';
import { UserRole, UserStatus } from '../../src/domain/enums/UserEnums';
import { errorMessages } from '../../src/shared/constants/error-messages';

describe('Handler Integration Tests', () => {
  const mockUserRepository = createMockUserRepository();
  const mockCryptoService = createMockCryptoService();
  const mockProtobufService = createMockProtobufService();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CreateUserHandler', () => {
    const handler = new CreateUserHandler(mockUserRepository, mockCryptoService);

    it('should create a user successfully', async () => {
      const command = TestFactory.createUserCommand();
      const expectedUser = TestFactory.createUser({ email: command.email });

      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockCryptoService.signEmail.mockReturnValue('signature');
      mockUserRepository.create.mockResolvedValue(expectedUser);

      const result = await handler.handle(command);

      expect(result).toEqual(expectedUser);
      expect(mockUserRepository.create).toHaveBeenCalled();
    });

    it('should throw error when email already exists', async () => {
      const command = TestFactory.createUserCommand();
      const existingUser = TestFactory.createUser();

      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      await expect(handler.handle(command)).rejects.toThrow(errorMessages.user.duplicateEmail);
    });
  });

  describe('UpdateUserHandler', () => {
    const handler = new UpdateUserHandler(mockUserRepository, mockCryptoService);

    it('should update a user successfully', async () => {
      const existingUser = TestFactory.createUser({ id: 1, email: 'old@example.com' });
      const command = TestFactory.updateUserCommand({ id: 1, email: 'new@example.com', role: UserRole.ADMIN, status: UserStatus.ACTIVE });
      const updatedUser = TestFactory.createUser({ id: 1, email: 'new@example.com' });

      mockUserRepository.findById.mockResolvedValue(existingUser);
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockCryptoService.signEmail.mockReturnValue('new_signature');
      mockUserRepository.update.mockResolvedValue(updatedUser);

      const result = await handler.handle(command);

      expect(result).toEqual(updatedUser);
    });

    it('should throw error when user not found', async () => {
      const command = TestFactory.updateUserCommand({ id: 999 });

      mockUserRepository.findById.mockResolvedValue(null);

      await expect(handler.handle(command)).rejects.toThrow(errorMessages.user.notFound);
    });
  });

  describe('DeleteUserHandler', () => {
    const handler = new DeleteUserHandler(mockUserRepository);

    it('should delete a user successfully', async () => {
      const existingUser = TestFactory.createUser({ id: 1 });
      const command = TestFactory.deleteUserCommand({ id: 1 });

      mockUserRepository.findById.mockResolvedValue(existingUser);

      await handler.handle(command);

      expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw error when user not found', async () => {
      const command = TestFactory.deleteUserCommand({ id: 999 });

      mockUserRepository.findById.mockResolvedValue(null);

      await expect(handler.handle(command)).rejects.toThrow(errorMessages.user.notFound);
    });
  });

  describe('GetAllUsersHandler', () => {
    const handler = new GetAllUsersHandler(mockUserRepository);

    it('should return all users', async () => {
      const users = [TestFactory.createUser(), TestFactory.createUser()];
      const query = TestFactory.getAllUsersQuery();

      mockUserRepository.findAll.mockResolvedValue(users);

      const result = await handler.handle(query);

      expect(result).toEqual(users);
      expect(result.length).toBe(2);
    });

    it('should return empty array when no users exist', async () => {
      const query = TestFactory.getAllUsersQuery();

      mockUserRepository.findAll.mockResolvedValue([]);

      const result = await handler.handle(query);

      expect(result).toEqual([]);
    });
  });

  describe('GetUserByIdHandler', () => {
    const handler = new GetUserByIdHandler(mockUserRepository);

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

  describe('GetUserStatsHandler', () => {
    const handler = new GetUserStatsHandler(mockUserRepository);

    it('should return user statistics', async () => {
      const stats = TestFactory.createDailyStats(7);
      const query = TestFactory.getUserStatsQuery();

      mockUserRepository.getStats.mockResolvedValue(stats);

      const result = await handler.handle(query);

      expect(result).toEqual(stats);
      expect(result.length).toBe(7);
    });
  });

  describe('ExportUsersProtobufHandler', () => {
    const handler = new ExportUsersProtobufHandler(mockUserRepository, mockProtobufService);

    it('should export users as protobuf', async () => {
      const users = [TestFactory.createUser()];
      const buffer = Buffer.from('protobuf_data');
      const query = TestFactory.exportUsersProtobufQuery();

      mockUserRepository.findAll.mockResolvedValue(users);
      mockProtobufService.encodeUsers.mockResolvedValue(buffer);

      const result = await handler.handle(query);

      expect(Buffer.isBuffer(result)).toBe(true);
      expect(mockProtobufService.encodeUsers).toHaveBeenCalledWith(users);
    });
  });

  describe('GetPublicKeyHandler', () => {
    const handler = new GetPublicKeyHandler(mockCryptoService);

    it('should return public key information', async () => {
      const query = TestFactory.getPublicKeyQuery();
      const publicKey = '-----BEGIN PUBLIC KEY-----\nKEY_DATA\n-----END PUBLIC KEY-----';

      mockCryptoService.getPublicKey.mockReturnValue(publicKey);

      const result = await handler.handle(query);

      expect(result.publicKey).toBe(publicKey);
      expect(result.algorithm).toBe('ECDSA');
      expect(result.curve).toBe('secp384r1');
      expect(result.hash).toBe('SHA-384');
    });
  });
});
