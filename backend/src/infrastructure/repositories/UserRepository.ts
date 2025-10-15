import Database from 'better-sqlite3';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../application/repositories/IUserRepository';
import { UserRole, UserStatus } from '../../domain/enums/UserEnums';
import { errorMessages } from '../../shared/constants/error-messages';

/**
 * SQLite User Repository Implementation
 * Handles user data persistence using better-sqlite3
 */
export class UserRepository implements IUserRepository {
  /**
   * Creates a new UserRepository instance
   * @param {Database.Database} db - SQLite database instance
   */
  constructor(private readonly db: Database.Database) {}

  /**
   * Retrieves all users ordered by creation date (newest first)
   * @returns {Promise<User[]>} Array of all users
   */
  async findAll(): Promise<User[]> {
    const query = 'SELECT * FROM users ORDER BY createdAt DESC';
    const rows = this.db.prepare(query).all() as Array<{
      id: number;
      email: string;
      role: UserRole;
      status: UserStatus;
      createdAt: string;
      signature: string;
    }>;

    return rows.map(row => new User(
      row.id,
      row.email,
      row.role as UserRole,
      row.status as UserStatus,
      row.createdAt,
      row.signature
    ));
  }

  /**
   * Finds a user by ID
   * @param {number} id - User ID
   * @returns {Promise<User | null>} User if found, null otherwise
   */
  async findById(id: number): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = ?';
    const row = this.db.prepare(query).get(id) as {
      id: number;
      email: string;
      role: UserRole;
      status: UserStatus;
      createdAt: string;
      signature: string;
    } | undefined;

    if (!row) return null;

    return new User(
      row.id,
      row.email,
      row.role as UserRole,
      row.status as UserStatus,
      row.createdAt,
      row.signature
    );
  }

  /**
   * Finds a user by email address
   * @param {string} email - User email
   * @returns {Promise<User | null>} User if found, null otherwise
   */
  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = ?';
    const row = this.db.prepare(query).get(email) as {
      id: number;
      email: string;
      role: UserRole;
      status: UserStatus;
      createdAt: string;
      signature: string;
    } | undefined;

    if (!row) return null;

    return new User(
      row.id,
      row.email,
      row.role as UserRole,
      row.status as UserStatus,
      row.createdAt,
      row.signature
    );
  }

  /**
   * Creates a new user
   * @param {string} email - User email
   * @param {UserRole} role - User role
   * @param {UserStatus} status - User status
   * @param {string} signature - ECDSA signature of email
   * @returns {Promise<User>} Created user
   * @throws {Error} If user creation fails
   */
  async create(email: string, role: UserRole, status: UserStatus, signature: string): Promise<User> {
    const createdAt = new Date().toISOString();
    const query = `
      INSERT INTO users (email, role, status, createdAt, signature)
      VALUES (?, ?, ?, ?, ?)
    `;

    const result = this.db.prepare(query).run(email, role, status, createdAt, signature);
    const userId = Number(result.lastInsertRowid);

    const user = await this.findById(userId);
    if (!user) {
      throw new Error(errorMessages.user.createFailed);
    }

    return user;
  }

  /**
   * Updates an existing user
   * @param {number} id - User ID
   * @param {Partial<{email: string, role: UserRole, status: UserStatus, signature: string}>} updates - Fields to update
   * @returns {Promise<User>} Updated user
   * @throws {Error} If user not found
   */
  async update(
    id: number,
    updates: Partial<{email: string, role: UserRole, status: UserStatus, signature: string}>
  ): Promise<User> {
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.email !== undefined) {
      fields.push('email = ?');
      values.push(updates.email);
    }
    if (updates.role !== undefined) {
      fields.push('role = ?');
      values.push(updates.role);
    }
    if (updates.status !== undefined) {
      fields.push('status = ?');
      values.push(updates.status);
    }
    if (updates.signature !== undefined) {
      fields.push('signature = ?');
      values.push(updates.signature);
    }

    if (fields.length === 0) {
      const user = await this.findById(id);
      if (!user) throw new Error(errorMessages.user.notFound);
      return user;
    }

    values.push(id);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    this.db.prepare(query).run(...values);

    const updatedUser = await this.findById(id);
    if (!updatedUser) {
      throw new Error(errorMessages.user.updateFailed);
    }

    return updatedUser;
  }

  /**
   * Deletes a user by ID
   * @param {number} id - User ID
   * @returns {Promise<boolean>} True if deleted successfully
   */
  async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM users WHERE id = ?';
    const result = this.db.prepare(query).run(id);
    return result.changes > 0;
  }

  /**
   * Gets user creation statistics for the last 7 days (Africa/Kigali timezone UTC+02:00)
   * @returns {Promise<Array<{date: string, count: number}>>} Daily stats
   */
  async getStats(): Promise<Array<{date: string, count: number}>> {
    const KIGALI_OFFSET_MINUTES = -120;
    const modifier = `${-KIGALI_OFFSET_MINUTES} minutes`;

    const sql = `
      WITH RECURSIVE days(d) AS (
        SELECT DATE('now','utc', ?, '-6 days')
        UNION ALL
        SELECT DATE(d, '+1 day') FROM days WHERE d < DATE('now','utc', ?)
      )
      SELECT d as date,
             COALESCE((
               SELECT COUNT(*) FROM users WHERE DATE(datetime(createdAt, ?)) = d
             ), 0) as count
      FROM days;
    `;

    const rows = this.db
      .prepare(sql)
      .all(modifier, modifier, modifier) as Array<{date: string, count: number}>;

    return rows;
  }
}
