import { Role } from 'src/enums/role.enum';

export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  creditCard: string;
  token?: string;
  salt?: string;
  address: string;
  loginDate: Date;
  role?: Role;
}
