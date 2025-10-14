import HttpStatus from 'http-status';
import { Request, Response, Router } from 'express';
import { ExportUsersProtobufQuery } from './ExportUsersProtobufQuery';
import { ExportUsersProtobufHandler } from './ExportUsersProtobufHandler';
import { CONTENT_TYPES, CACHE_CONTROL, ERROR_MESSAGES } from '../../../../constants';
import { sendError } from '../../../../shared/utils/response';

/**
 * Export Users Protobuf Route
 * GET /api/users/export - Export users in Protocol Buffer format
 *
 * @param {ExportUsersProtobufHandler} handler - Export users protobuf query handler
 * @returns {Router} Express router
 */
export function exportUsersProtobufRoute(handler: ExportUsersProtobufHandler): Router {
  const router = Router();

  /**
   * GET /api/users/export
   * Exports all users in binary protobuf format
   */
  router.get('/users/export', async (_req: Request, res: Response) => {
    try {
      const query = new ExportUsersProtobufQuery();
      const binaryData = await handler.handle(query);

      res.setHeader('Content-Type', CONTENT_TYPES.PROTOBUF);
      res.setHeader('Content-Disposition', 'attachment; filename="users.pb"');
      res.setHeader('Content-Length', binaryData.length.toString());
      res.setHeader('Cache-Control', CACHE_CONTROL.NO_STORE);

      return res.status(HttpStatus.OK).send(binaryData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.FAILED_TO_EXPORT_USERS;
      return sendError(res, errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });

  return router;
}
