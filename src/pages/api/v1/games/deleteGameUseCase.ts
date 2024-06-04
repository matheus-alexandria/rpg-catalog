import { prisma } from '@/utils/prisma';

export class DeleteGameUseCase {
  async execute({ id }: IDeleteGameParams) {
    prisma.game.delete({
      where: {
        id
      }
    });
  }
}

interface IDeleteGameParams {
  id: string;
}
