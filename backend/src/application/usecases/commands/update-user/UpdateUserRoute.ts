import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status';
import { UpdateUserCommand } from './UpdateUserCommand';
import { UpdateUserHandler } from './UpdateUserHandler';
import { ERROR_MESSAGES } from '../../../../constants';
import { sendError, sendSuccess } from '../../../../shared/utils/response';
import { isValidId } from '../../../../shared/utils/validation';
import { UserRole, UserStatus } from '../../../../domain/enums/UserEnums';

/**
 * Update User Route
 * PUT /api/users/:id - Update an existing user
 *
 * @param {UpdateUserHandler} handler - Update user command handler
 * @returns {Router} Express router
 */
export function updateUserRoute(handler: UpdateUserHandler): Router {
  const router = Router();

  /**
   * PUT /api/users/:id
   * Updates an existing user
   */
  router.put('/users/:id', async (req: Request, res: Response) => {
    try {
      const id = isValidId(req.params.id);
      if (!id) {
        return sendError(res, ERROR_MESSAGES.INVALID_USER_ID, HttpStatus.BAD_REQUEST);
      }

      const { email, role, status } = req.body;

      const command = new UpdateUserCommand(id, email, role as UserRole | undefined, status as UserStatus | undefined);
      const user = await handler.handle(command);

      return sendSuccess(res, user);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.FAILED_TO_UPDATE_USER;
      const statusCode = error instanceof Error && error.message === 'User not found'
        ? HttpStatus.NOT_FOUND
        : HttpStatus.INTERNAL_SERVER_ERROR;
      return sendError(res, errorMessage, statusCode);
    }
  });

  return router;
}
