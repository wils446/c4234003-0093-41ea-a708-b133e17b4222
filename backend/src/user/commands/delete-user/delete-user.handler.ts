import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { DeleteUserCommand } from './delete-user.command';
import { User } from 'src/user/entities';
import { UserRepository } from 'src/user/repositories';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: DeleteUserCommand) {
    const result = await this.userRepository.delete({ id: command.userId });
    if (result.affected === 0) throw new NotFoundException('user is not found');
  }
}
