import { faker } from '@faker-js/faker';

import { User } from '../../src/domain/entities/User';
import { UserRole, UserStatus } from '../../src/domain/enums/UserEnums';
import { CreateUserCommand } from '../../src/application/usecases/commands/create-user/CreateUserCommand';
import { UpdateUserCommand } from '../../src/application/usecases/commands/update-user/UpdateUserCommand';
import { DeleteUserCommand } from '../../src/application/usecases/commands/delete-user/DeleteUserCommand';
import { GetAllUsersQuery } from '../../src/application/usecases/queries/get-all-users/GetAllUsersQuery';
import { GetUserByIdQuery } from '../../src/application/usecases/queries/get-user-by-id/GetUserByIdQuery';
import { GetUserStatsQuery } from '../../src/application/usecases/queries/get-user-stats/GetUserStatsQuery';
import { ExportUsersProtobufQuery } from '../../src/application/usecases/queries/export-users-protobuf/ExportUsersProtobufQuery';
import { GetPublicKeyQuery } from '../../src/application/usecases/queries/get-public-key/GetPublicKeyQuery';

/**
 * Test Data Factory using Faker.js
 * Creates realistic test data with sensible defaults (DRY principle)
 */
export class TestFactory {
  /**
   * Creates a User entity for testing
   * @param overrides - Properties to override defaults
   * @returns User entity with fake data
   */
  static createUser(overrides: Partial<User> = {}): User {
    return new User(
      overrides.id ?? faker.number.int({ min: 1, max: 10000 }),
      overrides.email ?? faker.internet.email(),
      overrides.role ?? faker.helpers.arrayElement([UserRole.ADMIN, UserRole.USER, UserRole.GUEST]),
      overrides.status ?? faker.helpers.arrayElement([UserStatus.ACTIVE, UserStatus.INACTIVE]),
      overrides.createdAt ?? faker.date.recent().toISOString(),
      overrides.signature ?? faker.string.hexadecimal({ length: 96, prefix: '' })
    );
  }

  /**
   * Creates multiple User entities for testing
   * @param count - Number of users to create
   * @param overrides - Properties to override for each user
   * @returns Array of User entities
   */
  static createUsers(count: number, overrides: Partial<User> = {}): User[] {
    return Array.from({ length: count }, () => TestFactory.createUser(overrides));
  }

  /**
   * Creates a CreateUserCommand for testing
   * @param overrides - Properties to override defaults
   * @returns CreateUserCommand with fake data
   */
  static createUserCommand(overrides: Partial<CreateUserCommand> = {}): CreateUserCommand {
    return new CreateUserCommand(
      overrides.email ?? faker.internet.email(),
      overrides.role ?? faker.helpers.arrayElement([UserRole.ADMIN, UserRole.USER, UserRole.GUEST]),
      overrides.status ?? faker.helpers.arrayElement([UserStatus.ACTIVE, UserStatus.INACTIVE])
    );
  }

  /**
   * Creates an UpdateUserCommand for testing
   * @param overrides - Properties to override defaults
   * @returns UpdateUserCommand with fake data
   */
  static updateUserCommand(overrides: Partial<UpdateUserCommand> = {}): UpdateUserCommand {
    return new UpdateUserCommand(
      overrides.id ?? faker.number.int({ min: 1, max: 1000 }),
      overrides.email,
      overrides.role,
      overrides.status
    );
  }

  /**
   * Creates a valid email for testing
   * @returns Fake email address
   */
  static createEmail(): string {
    return faker.internet.email();
  }

  /**
   * Creates a valid signature (hex string)
   * @returns Fake hex signature
   */
  static createSignature(): string {
    return faker.string.hexadecimal({ length: 96, prefix: '' });
  }

  /**
   * Creates daily stats data for testing
   * @param days - Number of days of stats
   * @returns Array of daily stats
   */
  static createDailyStats(days: number = 7): Array<{ date: string; count: number }> {
    return Array.from({ length: days }, (_, i) => ({
      date: faker.date.recent({ days: days - i }).toISOString().split('T')[0],
      count: faker.number.int({ min: 0, max: 50 }),
    }));
  }

  /**
   * Creates a DeleteUserCommand for testing
   * @param overrides - Properties to override defaults
   * @returns DeleteUserCommand with fake data
   */
  static deleteUserCommand(overrides: Partial<DeleteUserCommand> = {}): DeleteUserCommand {
    return new DeleteUserCommand(overrides.id ?? faker.number.int({ min: 1, max: 1000 }));
  }

  /**
   * Creates a GetAllUsersQuery for testing
   * @returns GetAllUsersQuery instance
   */
  static getAllUsersQuery(): GetAllUsersQuery {
    return new GetAllUsersQuery();
  }

  /**
   * Creates a GetUserByIdQuery for testing
   * @param overrides - Properties to override defaults
   * @returns GetUserByIdQuery with fake data
   */
  static getUserByIdQuery(overrides: Partial<GetUserByIdQuery> = {}): GetUserByIdQuery {
    return new GetUserByIdQuery(overrides.id ?? faker.number.int({ min: 1, max: 1000 }));
  }

  /**
   * Creates a GetUserStatsQuery for testing
   * @returns GetUserStatsQuery instance
   */
  static getUserStatsQuery(): GetUserStatsQuery {
    return new GetUserStatsQuery();
  }

  /**
   * Creates user statistics for testing
   * @param overrides - Properties to override defaults
   * @returns User statistics object
   */
  static createUserStats(
    overrides: {
      total?: number;
      active?: number;
      inactive?: number;
      byRole?: { admin: number; user: number; guest: number };
      daily?: Array<{ date: string; count: number }>;
    } = {}
  ): {
    total: number;
    active: number;
    inactive: number;
    byRole: { admin: number; user: number; guest: number };
    daily: Array<{ date: string; count: number }>;
  } {
    const total = overrides.total ?? faker.number.int({ min: 0, max: 1000 });
    const active = overrides.active ?? faker.number.int({ min: 0, max: total });
    const inactive = overrides.inactive ?? total - active;

    return {
      total,
      active,
      inactive,
      byRole: overrides.byRole ?? {
        admin: faker.number.int({ min: 0, max: total }),
        user: faker.number.int({ min: 0, max: total }),
        guest: faker.number.int({ min: 0, max: total }),
      },
      daily: overrides.daily ?? TestFactory.createDailyStats(7),
    };
  }

  /**
   * Creates an ExportUsersProtobufQuery for testing
   * @returns ExportUsersProtobufQuery instance
   */
  static exportUsersProtobufQuery(): ExportUsersProtobufQuery {
    return new ExportUsersProtobufQuery();
  }

  /**
   * Creates a GetPublicKeyQuery for testing
   * @returns GetPublicKeyQuery instance
   */
  static getPublicKeyQuery(): GetPublicKeyQuery {
    return new GetPublicKeyQuery();
  }
}
