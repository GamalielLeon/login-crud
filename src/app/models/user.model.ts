export interface UserModel{
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  active?: boolean;
  password?: string;
  createdAt?: string;
}
