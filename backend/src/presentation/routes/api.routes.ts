import { Router } from 'express';
import { Container } from '../../infrastructure/dependencies/Container';

import { createUserRoute } from '../../application/usecases/commands/create-user/CreateUserRoute';
import { updateUserRoute } from '../../application/usecases/commands/update-user/UpdateUserRoute';
import { deleteUserRoute } from '../../application/usecases/commands/delete-user/DeleteUserRoute';

import { getAllUsersRoute } from '../../application/usecases/queries/get-all-users/GetAllUsersRoute';
import { getUserByIdRoute } from '../../application/usecases/queries/get-user-by-id/GetUserByIdRoute';
import { getUserStatsRoute } from '../../application/usecases/queries/get-user-stats/GetUserStatsRoute';
import { exportUsersProtobufRoute } from '../../application/usecases/queries/export-users-protobuf/ExportUsersProtobufRoute';
import { getPublicKeyRoute } from '../../application/usecases/queries/get-public-key/GetPublicKeyRoute';

/**
 * Creates API routes with CQRS pattern
 * Each route is defined in its corresponding use case folder
 *
 * @param {Container} container - Dependency injection container
 * @returns {Router} Express router with all API routes
 */
export function createApiRoutes(container: Container): Router {
  const router = Router();

  // Public key query
  router.use(getPublicKeyRoute(container.getPublicKeyHandler));

  // User stats query (must be before /users/:id)
  router.use(getUserStatsRoute(container.getUserStatsHandler));

  // Export query (must be before /users/:id)
  router.use(exportUsersProtobufRoute(container.exportUsersProtobufHandler));

  // User queries
  router.use(getAllUsersRoute(container.getAllUsersHandler));
  router.use(getUserByIdRoute(container.getUserByIdHandler));

  // User commands
  router.use(createUserRoute(container.createUserHandler));
  router.use(updateUserRoute(container.updateUserHandler));
  router.use(deleteUserRoute(container.deleteUserHandler));

  return router;
}
