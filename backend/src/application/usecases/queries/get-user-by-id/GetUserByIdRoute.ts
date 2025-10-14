import HttpStatus from 'http-status';
import { Request, Response, Router } from 'express';
import { GetUserByIdQuery } from './GetUserByIdQuery';
import { GetUserByIdHandler } from './GetUserByIdHandler';
import { ERROR_MESSAGES } from '../../../../constants';
import { sendError, sendSuccess } from '../../../../shared/utils/response';
import { isValidId } from '../../../../shared/utils/validation';

/**
 * Get User By ID Route
 * GET /api/users/:id - Get a user by ID
 *
 * @param {GetUserByIdHandler} handler - Get user by ID query handler
 * @returns {Router} Express router
 */
export function getUserByIdRoute(handler: GetUserByIdHandler): Router {
  const router = Router();

  /**
   * GET /api/users/:id
   * Retrieves a user by ID
   */
  router.get('/users/:id', async (req: Request, res: Response) => {
    try {
      const id = isValidId(req.params.id);
      if (!id) {
        return sendError(res, ERROR_MESSAGES.INVALID_USER_ID, HttpStatus.BAD_REQUEST);
      }

      const query = new GetUserByIdQuery(id);
      const user = await handler.handle(query);

      if (!user) {
        return sendError(res, ERROR_MESSAGES.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      return sendSuccess(res, user);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.FAILED_TO_FETCH_USER;
      return sendError(res, errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });

  return router;
}
