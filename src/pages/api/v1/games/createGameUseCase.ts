import { NotFoundError } from '@/errors';
import { prisma } from '@/utils/prisma';

export class CreateGameUseCase {
  async execute(params: CreateGameParams) {
    const { title, description, dice, themes, gameplay_focus } = params;

    const foundThemes = await prisma.theme.findMany({
      where: {
        name: {
          in: themes
        }
      }
    });

    if (!foundThemes.length) {
      throw new NotFoundError('No themes found with the given names.');
    }

    const game = await prisma.game.create({
      data: {
        title,
        description,
        dice,
        game_themes: {
          createMany: {
            data: foundThemes.map((theme) => ({
              theme_id: theme.id,
              is_main: false
            }))
          }
        },
        gameplay_focus
      },
      include: {
        game_themes: {
          include: {
            theme: { select: { name: true } }
          }
        }
      }
    });

    return game;
  }
}

interface CreateGameParams {
  title: string;
  description: string;
  dice: string;
  themes: string[];
  gameplay_focus: string;
}
