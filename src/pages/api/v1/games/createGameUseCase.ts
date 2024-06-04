import { prisma } from '@/utils/prisma';

export class CreateGameUseCase {
  async execute(params: CreateGameParams) {
    const { title, description, dice, theme, gameplay_focus } = params;

    const game = await prisma.game.create({
      data: {
        title,
        description,
        dice,
        theme,
        gameplay_focus
      }
    });

    return game;
  }
}

interface CreateGameParams {
  title: string;
  description: string;
  dice: string;
  theme: string;
  gameplay_focus: string;
}
