import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { PartialType as ApiPartialType } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ type: ApiPartialType(CreateUserDto) })
  @ValidateNested()
  @Type(() => PartialType(CreateUserDto))
  updateData: Partial<CreateUserDto>;
}

export class UpdateUsersDto {
  @ApiProperty({ type: [UpdateUserDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateUserDto)
  updateUsers: UpdateUserDto[];
}
