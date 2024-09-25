import { NotFoundError } from '@/errors';
import { prisma } from '@/utils/prisma';
import { compare } from 'bcryptjs';

export class LoginUseCase {
  async execute(data: LoginParams) {
    const user = await prisma.user.findUnique({
      where: {
        login: data.login
      }
    });

    if (!user) {
      throw new NotFoundError('Login ou senha incorretos');
    }

    const isPasswordCorrect = await compare(data.password, user.password);

    if (!isPasswordCorrect) {
      throw new NotFoundError('Login ou senha incorretos');
    }

    return {
      id: user.id,
      login: user.login,
      role: user.role
    };
  }
}

interface LoginParams {
  login: string;
  password: string;
}
