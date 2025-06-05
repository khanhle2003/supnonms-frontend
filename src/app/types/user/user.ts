import { UserRole } from './user-role.enum';

export interface User {
  id?: number;
  username: string;
  password?: string;
  email: string;
  fullName?: string;
  phone?: string;
  address?: string;
  role: UserRole;
  enabled: boolean;
  verificationToken?: string;
  createdAt?: string;
  updatedAt?: string;
}