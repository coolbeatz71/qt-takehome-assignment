import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Container } from './infrastructure/dependencies/Container';
import { createApiRoutes } from './presentation/routes/api.routes';
import { DatabaseConfig } from './infrastructure/database/DatabaseConfig';

dotenv.config();

/**
 * Application Server
 * Main entry point for the Express application using Clean Architecture
 */
class App {
  private readonly app: Express;
  private readonly port: number;
  private container!: Container;

  /**
   * Creates a new App instance
   */
  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000', 10);
  }

  /**
   * Initializes the application
   */
  async initialize(): Promise<void> {
    // Setup middleware
    this.setupMiddleware();

    // Initialize database
    const db = DatabaseConfig.getInstance();
    DatabaseConfig.initializeTables(db);

    // Initialize dependency injection container
    this.container = Container.getInstance(db);
    await this.container.initialize();

    // Setup routes
    this.setupRoutes();

    // Setup error handlers
    this.setupErrorHandlers();

    console.log('✓ Application initialized');
  }

  /**
   * Sets up Express middleware
   * @private
   */
  private setupMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  /**
   * Sets up application routes
   * @private
   */
  private setupRoutes(): void {
    // Health check endpoint
    this.app.get('/health', (_req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
      });
    });

    // Root endpoint
    this.app.get('/', (_req: Request, res: Response) => {
      res.status(200).json({
        success: true,
        message: 'Admin Panel API - Clean Architecture',
        version: '2.0.0',
        architecture: 'Clean Architecture + Vertical Slices',
      });
    });

    // API routes
    this.app.use('/api', createApiRoutes(this.container));
  }

  /**
   * Sets up global error handlers
   * @private
   */
  private setupErrorHandlers(): void {
    process.on('unhandledRejection', (reason) => {
      console.error('Unhandled Rejection:', reason);
    });

    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      process.exit(1);
    });
  }

  /**
   * Starts the server
   */
  start(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on http://localhost:${this.port}`);
      console.log(`📋 Architecture: Clean Architecture + Vertical Slices`);
    });
  }
}

/**
 * Bootstrap the application
 */
async function bootstrap(): Promise<void> {
  try {
    const app = new App();
    await app.initialize();
    app.start();
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

// Start the application
bootstrap();

export default App;
