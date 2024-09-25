import { ConflictError } from '@/errors';
import { prisma } from '@/utils/prisma';
import { Role } from '@prisma/client';
import { hash } from 'bcryptjs';

export class CreateUserUseCase {
  async execute(data: CreateUserParams) {
    const userFound = await prisma.user.findUnique({
      where: {
        login: data.login
      }
    });
    if (userFound) {
      throw new ConflictError('A user with this login already exists');
    }
    const hashPassword = await hash(data.password, 6);
    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashPassword
      }
    });
    return {
      id: user.id,
      login: user.login,
      role: user.role
    };
  }
}

export interface CreateUserParams {
  login: string;
  password: string;
  role: Role;
}
