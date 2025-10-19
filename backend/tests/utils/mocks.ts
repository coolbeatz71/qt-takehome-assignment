import { IUserRepository } from '../../src/application/repositories/IUserRepository';
import { ICryptoService } from '../../src/domain/services/ICryptoService';
import { IProtobufService } from '../../src/domain/services/IProtobufService';
import { User } from '../../src/domain/entities/User';
import { TestFactory } from './factories';

/**
 * Mock Builder Pattern
 * Creates test mocks with sensible defaults (SOLID: Interface Segregation)
 */

/**
 * Creates a mock UserRepository
 * @param overrides - Methods to override with custom implementations
 * @returns Mocked IUserRepository
 */
export function createMockUserRepository(
  overrides: Partial<IUserRepository> = {}
): jest.Mocked<IUserRepository> {
  return {
    findAll: jest.fn().mockResolvedValue([]) as any,
    findById: jest.fn().mockResolvedValue(null) as any,
    findByEmail: jest.fn().mockResolvedValue(null) as any,
    create: jest.fn().mockImplementation(async (email, role, status, signature) =>
      TestFactory.createUser({ email, role: role as any, status: status as any, signature })
    ) as any,
    update: jest.fn().mockImplementation(async (id, updates) =>
      TestFactory.createUser({ id, ...updates })
    ) as any,
    delete: jest.fn().mockResolvedValue(true) as any,
    getStats: jest.fn().mockResolvedValue(TestFactory.createDailyStats()) as any,
    ...overrides,
  } as jest.Mocked<IUserRepository>;
}

/**
 * Creates a mock CryptoService
 * @param overrides - Methods to override with custom implementations
 * @returns Mocked ICryptoService
 */
export function createMockCryptoService(
  overrides: Partial<ICryptoService> = {}
): jest.Mocked<ICryptoService> {
  return {
    signEmail: jest.fn().mockReturnValue(TestFactory.createSignature()) as any,
    getPublicKey: jest.fn().mockReturnValue('-----BEGIN PUBLIC KEY-----\nMOCK_KEY\n-----END PUBLIC KEY-----') as any,
    verifySignature: jest.fn().mockReturnValue(true) as any,
    ...overrides,
  } as jest.Mocked<ICryptoService>;
}

/**
 * Creates a mock ProtobufService
 * @param overrides - Methods to override with custom implementations
 * @returns Mocked IProtobufService
 */
export function createMockProtobufService(
  overrides: Partial<IProtobufService> = {}
): jest.Mocked<IProtobufService> {
  return {
    encodeUsers: jest.fn().mockResolvedValue(Buffer.from('mock_protobuf_data')) as any,
    decodeUsers: jest.fn().mockResolvedValue([]) as any,
    ...overrides,
  } as jest.Mocked<IProtobufService>;
}

/**
 * Test Helper: Creates a user and configures repository mock to return it
 * @param repository - Mocked repository
 * @param user - User to return
 */
export function mockRepositoryWithUser(
  repository: jest.Mocked<IUserRepository>,
  user: User
): void {
  repository.findById.mockResolvedValue(user);
  repository.findByEmail.mockResolvedValue(user);
  repository.findAll.mockResolvedValue([user]);
}

/**
 * Test Helper: Resets all mocks in an object
 * @param mocks - Object containing mocked functions
 */
export function resetAllMocks(mocks: Record<string, jest.MockedFunction<any>>): void {
  Object.values(mocks).forEach(mock => mock.mockClear());
}
