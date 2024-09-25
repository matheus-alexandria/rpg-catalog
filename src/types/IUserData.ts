import { Role } from '@prisma/client';

export type IUserData = {
  id: string;
  login: string;
  role: Role;
};
