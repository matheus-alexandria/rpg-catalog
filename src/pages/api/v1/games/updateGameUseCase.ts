import { prisma } from '@/utils/prisma';

export class UpdateGameUseCase {
  async execute({ data, gameId }: UpdateGameParams) {
    const game = await prisma.game.update({
      data,
      where: {
        id: gameId
      }
    });

    return game;
  }
}

type UpdateGameData = {
  title: string;
  description: string;
  gameplay_focus: string;
  dice: string;
  explanation: string;
  cover_path: string;
};

type UpdateGameParams = {
  data: Partial<UpdateGameData>;
  gameId: string;
};
