import { prisma } from '@/utils/prisma';

export class GetAllGamesUseCase {
  async execute() {
    const games = await prisma.game.findMany({
      include: {
        GameTheme: {
          include: {
            theme: {
              select: { name: true }
            }
          }
        }
      }
    });

    return games;
  }
}
