import { prisma } from '@/utils/prisma';

export class GetAllThemesUseCase {
  async execute() {
    const themes = await prisma.theme.findMany();
    return themes;
  }
}
