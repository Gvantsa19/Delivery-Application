import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(200)
  password: string;
  @IsString()
  phoneNumber: string;
  @IsString()
  address: string;
}
