import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetAllUserDto {
  @IsString()
  @IsOptional()
  sort?: string;
  @Type(() => {
    return Number;
  })
  @IsOptional()
  @IsInt()
  limit?: number;
  @Type(() => {
    return Number;
  })
  @IsOptional()
  @IsInt()
  page?: number;
}
