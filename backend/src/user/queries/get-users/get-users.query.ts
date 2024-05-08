import { GetUsersQueryDto } from 'src/user/dtos';

export class GetUsersQuery {
  constructor(public readonly query: GetUsersQueryDto) {}
}
