import { NotFoundError } from '@/errors';
import { prisma } from '@/utils/prisma';

export class GetOneGamesUseCase {
  async execute(gameId: string) {
    const game = await prisma.game.findUnique({
      where: {
        id: gameId
      },
      include: {
        game_themes: {
          include: {
            theme: {
              select: { name: true }
            }
          }
        }
      }
    });

    if (!game) {
      throw new NotFoundError(`No game was found with id ${gameId}`);
    }

    return game;
  }
}
