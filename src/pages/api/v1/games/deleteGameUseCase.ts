import { prisma } from '@/utils/prisma';

export class DeleteGameUseCase {
  async execute({ id }: IDeleteGameParams) {
    await prisma.game.delete({
      where: { id }
    });
  }
}

interface IDeleteGameParams {
  id: string;
}
