import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities';
import { UserRepository } from 'src/user/repositories';
import { FindOptionsWhere, Raw } from 'typeorm';
import { GetUsersQuery } from './get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {}

  async execute({ query }: GetUsersQuery) {
    const page = +query.page - 1 || 0;
    const length = +query.length || 20;

    const where: FindOptionsWhere<User> = {};
    if (query.firstName)
      where.firstName = Raw(
        (alias) => `LOWER(${alias}) Like '%${query.firstName}%'`,
      );
    if (query.lastName)
      where.lastName = Raw(
        (alias) => `LOWER(${alias}) Like '%${query.lastName}%'`,
      );
    if (query.email)
      where.email = Raw((alias) => `LOWER(${alias}) Like '%${query.email}%'`);
    if (query.position)
      where.position = Raw(
        (alias) => `LOWER(${alias}) Like '%${query.position}%'`,
      );
    if (query.phone)
      where.phone = Raw((alias) => `LOWER(${alias}) Like '%${query.phone}%'`);

    const [users, counts] = await this.userRepository.findAndCount({
      take: length,
      skip: page * length,
      order: {
        [query.sortField]: query.sortType,
      },
      where,
    });

    return { users, counts };
  }
}
