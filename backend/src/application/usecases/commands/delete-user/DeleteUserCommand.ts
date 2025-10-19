/**
 * Delete User Command
 * Represents the intent to delete a user
 */
export class DeleteUserCommand {
  /**
   * Creates a new DeleteUserCommand
   * @param {number} id - User ID to delete
   */
  constructor(public readonly id: number) {}
}
