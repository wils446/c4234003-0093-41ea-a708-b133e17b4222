import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';
import { UserRepository } from './repositories';
import { UserController } from './user.controller';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [UserRepository, ...CommandHandlers, ...QueryHandlers],
})
export class UserModule {}
