import Database from 'better-sqlite3';
import { UserRepository } from '../repositories/UserRepository';
import { CryptoService } from '../crypto/CryptoService';
import { ProtobufService } from '../protobuf/ProtobufService';

// Commands (Write operations)
import { CreateUserHandler } from '../../application/usecases/commands/create-user/CreateUserHandler';
import { UpdateUserHandler } from '../../application/usecases/commands/update-user/UpdateUserHandler';
import { DeleteUserHandler } from '../../application/usecases/commands/delete-user/DeleteUserHandler';

// Queries (Read operations)
import { GetAllUsersHandler } from '../../application/usecases/queries/get-all-users/GetAllUsersHandler';
import { GetUserByIdHandler } from '../../application/usecases/queries/get-user-by-id/GetUserByIdHandler';
import { GetUserStatsHandler } from '../../application/usecases/queries/get-user-stats/GetUserStatsHandler';
import { ExportUsersProtobufHandler } from '../../application/usecases/queries/export-users-protobuf/ExportUsersProtobufHandler';
import { GetPublicKeyHandler } from '../../application/usecases/queries/get-public-key/GetPublicKeyHandler';

/**
 * Dependency Injection Container
 * Manages application dependencies and their lifecycle (IoC Container with CQRS)
 */
export class Container {
  private static instance: Container;

  // Infrastructure
  public readonly userRepository: UserRepository;
  public readonly cryptoService: CryptoService;
  public readonly protobufService: ProtobufService;

  // Command Handlers (Write operations)
  public readonly createUserHandler: CreateUserHandler;
  public readonly updateUserHandler: UpdateUserHandler;
  public readonly deleteUserHandler: DeleteUserHandler;

  // Query Handlers (Read operations)
  public readonly getAllUsersHandler: GetAllUsersHandler;
  public readonly getUserByIdHandler: GetUserByIdHandler;
  public readonly getUserStatsHandler: GetUserStatsHandler;
  public readonly exportUsersProtobufHandler: ExportUsersProtobufHandler;
  public readonly getPublicKeyHandler: GetPublicKeyHandler;

  /**
   * Creates a new Container instance
   * @param {Database.Database} db - SQLite database instance
   */
  private constructor(db: Database.Database) {
    // Infrastructure layer
    this.userRepository = new UserRepository(db);
    this.cryptoService = new CryptoService();
    this.protobufService = new ProtobufService();

    // Command Handlers (Write operations)
    this.createUserHandler = new CreateUserHandler(this.userRepository, this.cryptoService);
    this.updateUserHandler = new UpdateUserHandler(this.userRepository, this.cryptoService);
    this.deleteUserHandler = new DeleteUserHandler(this.userRepository);

    // Query Handlers (Read operations)
    this.getAllUsersHandler = new GetAllUsersHandler(this.userRepository);
    this.getUserByIdHandler = new GetUserByIdHandler(this.userRepository);
    this.getUserStatsHandler = new GetUserStatsHandler(this.userRepository);
    this.exportUsersProtobufHandler = new ExportUsersProtobufHandler(
      this.userRepository,
      this.protobufService
    );
    this.getPublicKeyHandler = new GetPublicKeyHandler(this.cryptoService);
  }

  /**
   * Gets or creates the singleton Container instance
   * @param {Database.Database} db - SQLite database instance
   * @returns {Container} Container instance
   */
  static getInstance(db: Database.Database): Container {
    if (!Container.instance) {
      Container.instance = new Container(db);
    }
    return Container.instance;
  }

  /**
   * Initializes all services that require async setup
   */
  async initialize(): Promise<void> {
    this.cryptoService.initialize();
    await this.protobufService.initialize();
  }
}
