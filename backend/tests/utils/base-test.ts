import { IUserRepository } from '../../src/application/repositories/IUserRepository';
import { ICryptoService } from '../../src/domain/services/ICryptoService';
import { IProtobufService } from '../../src/domain/services/IProtobufService';
import { createMockUserRepository, createMockCryptoService, createMockProtobufService } from './mocks';

/**
 * Base Test Class
 * Provides common setup for handler tests (DRY principle)
 */
export abstract class BaseHandlerTest {
  public mockUserRepository!: jest.Mocked<IUserRepository>;
  public mockCryptoService!: jest.Mocked<ICryptoService>;
  public mockProtobufService!: jest.Mocked<IProtobufService>;

  /**
   * Setup method called before each test
   * Creates fresh mocks for each test (Test Isolation)
   */
  protected setup(): void {
    this.mockUserRepository = createMockUserRepository();
    this.mockCryptoService = createMockCryptoService();
    this.mockProtobufService = createMockProtobufService();
  }

  /**
   * Teardown method called after each test
   * Clears all mocks
   */
  protected teardown(): void {
    jest.clearAllMocks();
  }
}

/**
 * Assertion Helpers (DRY principle)
 */
export class AssertionHelpers {
  /**
   * Asserts that a mock was called with specific arguments
   * @param mock - Jest mock function
   * @param expectedArgs - Expected arguments
   */
  static assertCalledWith<T extends any[]>(
    mock: jest.MockedFunction<any>,
    ...expectedArgs: T
  ): void {
    expect(mock).toHaveBeenCalledWith(...expectedArgs);
  }

  /**
   * Asserts that a mock was called exactly once
   * @param mock - Jest mock function
   */
  static assertCalledOnce(mock: jest.MockedFunction<any>): void {
    expect(mock).toHaveBeenCalledTimes(1);
  }

  /**
   * Asserts that a mock was never called
   * @param mock - Jest mock function
   */
  static assertNeverCalled(mock: jest.MockedFunction<any>): void {
    expect(mock).not.toHaveBeenCalled();
  }

  /**
   * Asserts that an async function throws an error with a specific message
   * @param fn - Async function to test
   * @param expectedMessage - Expected error message
   */
  static async assertThrowsAsync(fn: () => Promise<any>, expectedMessage: string): Promise<void> {
    await expect(fn()).rejects.toThrow(expectedMessage);
  }
}
