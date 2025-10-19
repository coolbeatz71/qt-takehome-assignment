import DatabaseLib from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

/**
 * Database Manager
 * Manages SQLite database connection and initialization
 */
export class DatabaseConfig {
  private static instance: DatabaseLib.Database;

  /**
   * Gets or creates the singleton database instance
   * @param {string} dbPath - Path to database file (optional, defaults to ./db/users.db)
   * @returns {DatabaseLib.Database} SQLite database instance
   */
  static getInstance(dbPath?: string): DatabaseLib.Database {
    if (!DatabaseConfig.instance) {
      const DB_DIR = path.join(__dirname, '../../../db');
      const DB_PATH = dbPath || path.join(DB_DIR, 'users.db');

      // Ensure database directory exists
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }

      DatabaseConfig.instance = new DatabaseLib(DB_PATH);
      DatabaseConfig.instance.pragma('foreign_keys = ON');
    }

    return DatabaseConfig.instance;
  }

  /**
   * Initializes database tables
   * @param {DatabaseLib.Database} db - Database instance
   */
  static initializeTables(db: DatabaseLib.Database): void {
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL CHECK(role IN ('admin', 'user', 'guest')),
        status TEXT NOT NULL CHECK(status IN ('active', 'inactive')),
        createdAt TEXT NOT NULL,
        signature TEXT NOT NULL
      )
    `;

    db.exec(createUsersTable);
    console.log('✓ Database tables initialized');
  }
}
