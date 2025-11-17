export class User {
  id?: number;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  token?: string;
  photo?: string;
}

export interface UserDTO {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}