import HttpStatus from 'http-status';
import { Request, Response, Router } from 'express';
import { GetPublicKeyQuery } from './GetPublicKeyQuery';
import { GetPublicKeyHandler } from './GetPublicKeyHandler';
import { sendError, sendSuccess } from '../../../../shared/utils/response';
import { errorMessages } from '../../../../shared/constants/error-messages';

/**
 * Get Public Key Route
 * GET /api/public-key - Get ECDSA public key
 *
 * @param {GetPublicKeyHandler} handler - Get public key query handler
 * @returns {Router} Express router
 */
export function getPublicKeyRoute(handler: GetPublicKeyHandler): Router {
  const router = Router();

  /**
   * GET /api/public-key
   * Retrieves the ECDSA P-384 public key information
   */
  router.get('/public-key', async (_req: Request, res: Response) => {
    try {
      const query = new GetPublicKeyQuery();
      const publicKeyData = await handler.handle(query);

      return sendSuccess(res, publicKeyData);
    } catch (error) {
      return sendError(res, errorMessages.crypto.publicKeyFailed, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });

  return router;
}
