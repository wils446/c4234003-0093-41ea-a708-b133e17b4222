import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserCommand } from './create-user.command';
import { User } from 'src/user/entities';
import { UserRepository } from 'src/user/repositories';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand) {
    const user = await this.userRepository.create({ ...command.createUserDto });

    try {
      await this.userRepository.save(user);
      return user;
    } catch (err) {
      throw new InternalServerErrorException((err as Error).message);
    }
  }
}
