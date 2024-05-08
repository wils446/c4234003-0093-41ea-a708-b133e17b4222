import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUsersCommand } from './update-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities';
import { UserRepository } from 'src/user/repositories';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdateUserDto } from 'src/user/dtos';
import { DataSource, QueryRunner } from 'typeorm';

@CommandHandler(UpdateUsersCommand)
export class UpdateUsersHandler implements ICommandHandler<UpdateUsersCommand> {
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
  ) {}

  async execute(command: UpdateUsersCommand) {
    this.queryRunner = this.dataSource.createQueryRunner();
    this.queryRunner.connect();
    this.queryRunner.startTransaction();

    const { updateUsersDto } = command;

    try {
      const updatedUsers = await Promise.all([
        ...updateUsersDto.updateUsers.map(
          async (updateUser) => await this.updateUserData(updateUser),
        ),
      ]);
      await this.queryRunner.commitTransaction();
      return updatedUsers;
    } catch (err) {
      await this.queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await this.queryRunner.release();
    }
  }

  async updateUserData(updateUser: UpdateUserDto) {
    const { updateData } = updateUser;
    const user = await this.userRepository.findOneByOrThrow({
      id: updateUser.id,
    });

    if (updateData.email) user.email = updateData.email;
    if (updateData.firstName) user.firstName = updateData.firstName;
    if (updateData.lastName) user.lastName = updateData.lastName;
    if (updateData.position) user.position = updateData.position;
    if (updateData.phone) user.phone = updateData.phone;

    try {
      await this.queryRunner.manager.save(user);
      return user;
    } catch (err) {
      throw new InternalServerErrorException((err as Error).message);
    }
  }
}
