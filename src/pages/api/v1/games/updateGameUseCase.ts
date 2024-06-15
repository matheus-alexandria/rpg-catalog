import { NotFoundError } from '@/errors';
import { prisma } from '@/utils/prisma';

export class UpdateGameUseCase {
  async execute({ data, gameId, themeNames }: UpdateGameParams) {
    const themes = await prisma.theme.findMany({
      where: {
        name: {
          in: themeNames
        }
      }
    });

    if (!themes.length) {
      throw new NotFoundError('No themes found with given names');
    }

    const game = await prisma.game.update({
      data,
      where: {
        id: gameId
      }
    });

    return game;
  }
}

interface UpdateGameData {
  title: string;
  description: string;
  gameplay_focus: string;
  dice: string;
  cover_path: string;
}

type UpdateGameParams = {
  data: AtLeastOne<UpdateGameData>;
  gameId: string;
  themeNames: string[];
};
