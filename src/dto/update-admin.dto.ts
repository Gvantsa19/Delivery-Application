import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateAdminDto {
  @IsString()
  fullName: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  @MaxLength(200)
  password: string;
  @IsString()
  phoneNumber: string;
}
