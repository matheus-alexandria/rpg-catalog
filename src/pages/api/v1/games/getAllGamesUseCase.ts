import { prisma } from '@/utils/prisma';

export class GetAllGamesUseCase {
  async execute() {
    const games = await prisma.game.findMany();

    return games;
  }
}
