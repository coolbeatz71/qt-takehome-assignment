import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status';
import { DeleteUserCommand } from './DeleteUserCommand';
import { DeleteUserHandler } from './DeleteUserHandler';
import { errorMessages } from '../../../../shared/constants/error-messages';
import { sendError, sendSuccess } from '../../../../shared/utils/response';
import { isValidId } from '../../../../shared/utils/validation';

/**
 * Delete User Route
 * DELETE /api/users/:id - Delete a user
 *
 * @param {DeleteUserHandler} handler - Delete user command handler
 * @returns {Router} Express router
 */
export function deleteUserRoute(handler: DeleteUserHandler): Router {
  const router = Router();

  /**
   * DELETE /api/users/:id
   * Deletes a user by ID
   */
  router.delete('/users/:id', async (req: Request, res: Response) => {
    try {
      const id = isValidId(req.params.id);
      if (!id) {
        return sendError(res, errorMessages.user.invalidId, HttpStatus.BAD_REQUEST);
      }

      const command = new DeleteUserCommand(id);
      await handler.handle(command);

      return sendSuccess(res, null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : errorMessages.user.deleteFailed;
      const statusCode = error instanceof Error && error.message === errorMessages.user.notFound
        ? HttpStatus.NOT_FOUND
        : HttpStatus.INTERNAL_SERVER_ERROR;
      return sendError(res, errorMessage, statusCode);
    }
  });

  return router;
}
