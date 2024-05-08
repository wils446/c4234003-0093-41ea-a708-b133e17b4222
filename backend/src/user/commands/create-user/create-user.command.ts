import { CreateUserDto } from 'src/user/dtos';

export class CreateUserCommand {
  constructor(public readonly createUserDto: CreateUserDto) {}
}
