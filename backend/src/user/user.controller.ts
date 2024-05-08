import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUsersCommand,
} from './commands';
import { CreateUserDto, GetUsersQueryDto, UpdateUsersDto } from './dtos';
import { User } from './entities';
import { GetUsersQuery } from './queries';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create an User' })
  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'user created',
    type: User,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  async createUser(@Body() bodyPayload: CreateUserDto) {
    return await this.commandBus.execute(new CreateUserCommand(bodyPayload));
  }

  @ApiOperation({ summary: 'Get users' })
  @Get()
  @ApiOkResponse({
    description: 'return users',
    schema: {
      example: {
        counts: 1,
        users: [
          {
            id: 'a5a2c8b4-8225-40e9-ae44-046ad1078a7e',
            firstName: 'Keegan',
            lastName: 'Emard',
            position: 'Assistant',
            phone: '4-776-299-3638',
            email: 'Florine.Koepp@gmail.com',
          },
        ],
      },
    },
  })
  @ApiBadRequestResponse({ description: 'bad request' })
  async getUsers(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    queries: GetUsersQueryDto,
  ) {
    return await this.queryBus.execute(new GetUsersQuery(queries));
  }

  @ApiOperation({ summary: 'Update users' })
  @Patch()
  @ApiOkResponse({ description: 'user updated', type: User, isArray: true })
  @ApiBadRequestResponse({ description: 'bad request' })
  async updateUsers(@Body() bodyPayload: UpdateUsersDto) {
    return await this.commandBus.execute(new UpdateUsersCommand(bodyPayload));
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete('/:id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'user is deleted' })
  async deleteUser(@Param('id') userId: string) {
    return await this.commandBus.execute(new DeleteUserCommand(userId));
  }
}
