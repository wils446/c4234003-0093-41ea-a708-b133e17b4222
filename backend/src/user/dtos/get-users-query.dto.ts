import { IsEnum, IsOptional, IsString } from 'class-validator';
import { GetQueryDto } from 'src/commons/dtos';

type UserField = 'firstName' | 'lastName' | 'position' | 'phone' | 'email';

const userFields: UserField[] = [
  'email',
  'firstName',
  'lastName',
  'phone',
  'position',
];

export class GetUsersQueryDto extends GetQueryDto {
  @IsOptional()
  @IsString()
  @IsEnum(userFields)
  sortField: UserField;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  position: string;
}
