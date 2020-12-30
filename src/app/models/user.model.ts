export interface UserModel{
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  roleId: string;
  birthDate: string;
  active?: boolean;
  password?: string;
  createdAt?: string;
}
