import { UpdateUsersDto } from 'src/user/dtos';

export class UpdateUsersCommand {
  constructor(public readonly updateUsersDto: UpdateUsersDto) {}
}
