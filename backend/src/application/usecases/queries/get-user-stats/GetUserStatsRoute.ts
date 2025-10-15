import HttpStatus from 'http-status';
import { Request, Response, Router } from 'express';
import { GetUserStatsQuery } from './GetUserStatsQuery';
import { GetUserStatsHandler } from './GetUserStatsHandler';
import { errorMessages } from '../../../../shared/constants/error-messages';
import { sendSuccess, sendError } from '../../../../shared/utils/response';

/**
 * Get User Stats Route
 * GET /api/users/stats - Get user creation statistics
 *
 * @param {GetUserStatsHandler} handler - Get user stats query handler
 * @returns {Router} Express router
 */
export function getUserStatsRoute(handler: GetUserStatsHandler): Router {
  const router = Router();

  /**
   * GET /api/users/stats
   * Retrieves user creation statistics for last 7 days
   */
  router.get('/users/stats', async (_req: Request, res: Response) => {
    try {
      const query = new GetUserStatsQuery();
      const stats = await handler.handle(query);

      return sendSuccess(res, stats);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : errorMessages.user.statsFailed;
      return sendError(res, errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });

  return router;
}
