import { Provider } from '@nestjs/common';

import { CreateUserHandler } from './create-user';
import { UpdateUsersHandler } from './update-users';
import { DeleteUserHandler } from './delete-user';

export * from './create-user';
export * from './update-users';
export * from './delete-user';

export const CommandHandlers: Provider[] = [
  CreateUserHandler,
  UpdateUsersHandler,
  DeleteUserHandler,
];
