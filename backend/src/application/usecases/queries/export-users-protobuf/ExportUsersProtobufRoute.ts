import HttpStatus from 'http-status';
import { Request, Response, Router } from 'express';
import { ExportUsersProtobufQuery } from './ExportUsersProtobufQuery';
import { ExportUsersProtobufHandler } from './ExportUsersProtobufHandler';
import { errorMessages } from '../../../../shared/constants/error-messages';
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

      res.setHeader('Cache-Control', "no-store");
      res.setHeader('Content-Type', "application/x-protobuf");
      res.setHeader('Content-Disposition', 'attachment; filename="users.pb"');
      res.setHeader('Content-Length', binaryData.length.toString());

      return res.status(HttpStatus.OK).send(binaryData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : errorMessages.user.exportFailed;
      return sendError(res, errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });

  return router;
}
