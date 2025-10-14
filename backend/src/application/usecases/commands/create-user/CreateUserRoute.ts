import { Request, Response, Router } from 'express';
import HttpStatus from 'http-status';
import { CreateUserCommand } from './CreateUserCommand';
import { CreateUserHandler } from './CreateUserHandler';
import { ERROR_MESSAGES } from '../../../../constants';
import { sendSuccess, sendError } from '../../../../shared/utils/response';
import { UserRole, UserStatus } from '../../../../domain/enums/UserEnums';


/**
 * Create User Route
 * POST /api/users - Create a new user
 *
 * @param {CreateUserHandler} handler - Create user command handler
 * @returns {Router} Express router
 */
export function createUserRoute(handler: CreateUserHandler): Router {
  const router = Router();

  /**
   * POST /api/users
   * Creates a new user with email signing
   */
  router.post('/users', async (req: Request, res: Response) => {
    try {
      const { email, role, status } = req.body;

      const command = new CreateUserCommand(email, role as UserRole, status as UserStatus);
      const user = await handler.handle(command);

      return sendSuccess(res, user, HttpStatus.CREATED);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.FAILED_TO_CREATE_USER;
      const statusCode = error instanceof Error && error.message.includes('Email already exists')
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;
      return sendError(res, errorMessage, statusCode);
    }
  });

  return router;
}
