import { prisma } from '@/utils/prisma';

export class DeleteThemeUseCase {
  async execute({ id }: IDeleteThemeParams) {
    await prisma.theme.delete({
      where: { id }
    });
  }
}

interface IDeleteThemeParams {
  id: string;
}
