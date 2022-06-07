import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
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
  @IsString()
  creditCard: string;
  @IsString()
  address: string;
  @IsEnum(Role)
  role: Role;
}
