import HttpStatus from 'http-status';
import { Request, Response, Router } from 'express';
import { GetAllUsersQuery } from './GetAllUsersQuery';
import { GetAllUsersHandler } from './GetAllUsersHandler';
import { errorMessages } from '../../../../shared/constants/error-messages';
import { sendSuccess, sendError } from '../../../../shared/utils/response';

/**
 * Get All Users Route
 * GET /api/users - Get all users
 *
 * @param {GetAllUsersHandler} handler - Get all users query handler
 * @returns {Router} Express router
 */
export function getAllUsersRoute(handler: GetAllUsersHandler): Router {
  const router = Router();

  /**
   * GET /api/users
   * Retrieves all users
   */
  router.get('/users', async (_req: Request, res: Response) => {
    try {
      const query = new GetAllUsersQuery();
      const users = await handler.handle(query);

      return sendSuccess(res, users);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : errorMessages.user.fetchAllFailed;
      return sendError(res, errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });

  return router;
}
