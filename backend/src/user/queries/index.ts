import { Provider } from '@nestjs/common';

import { GetUsersHandler } from './get-users';

export * from './get-users';

export const QueryHandlers: Provider[] = [GetUsersHandler];
