export interface Admin {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  registrationDate?: Date;
  loginDate?: Date;
  hash?: string;
  token?: string;
  isDeleted?: boolean;
}
