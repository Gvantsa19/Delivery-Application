import { IsDate, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsDate()
  loginDate: Date;
}
