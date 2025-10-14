/**
 * Get User By ID Query
 * Represents the intent to retrieve a specific user by ID
 */
export class GetUserByIdQuery {
  /**
   * Creates a new GetUserByIdQuery
   * @param {number} id - User ID to retrieve
   */
  constructor(public readonly id: number) {}
}
