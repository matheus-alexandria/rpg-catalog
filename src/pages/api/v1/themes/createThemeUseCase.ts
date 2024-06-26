import { ConflictError } from '@/errors';
import { prisma } from '@/utils/prisma';

export class CreateThemeUseCase {
  async execute(data: CreateThemeParams) {
    const themeFound = await prisma.theme.findUnique({
      where: {
        name: data.name
      }
    });
    if (themeFound) {
      throw new ConflictError('A theme with this name already exists');
    }
    const theme = await prisma.theme.create({
      data
    });
    return theme;
  }
}

export interface CreateThemeParams {
  name: string;
  description: string;
}
