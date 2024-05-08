import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

type SortType = 'asc' | 'desc';

const sortType = ['asc', 'desc'];

export class GetQueryDto {
  @IsOptional()
  @IsString()
  @IsEnum(sortType)
  sortType: SortType;

  @IsOptional()
  @IsNumberString()
  page: string;

  @IsOptional()
  @IsNumberString()
  length: string;
}
