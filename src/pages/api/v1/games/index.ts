import { prisma } from '@/utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function games(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'GET') {
    const games = await prisma.game.findMany();

    return response.status(200).json(games);
  }

  if (request.method === 'POST') {
    const { title, description, dice, theme, gameplay_focus } = JSON.parse(request.body);

    const game = await prisma.game.create({
      data: {
        title,
        description,
        dice,
        theme,
        gameplay_focus
      }
    });

    return response.status(201).json(game);
  }

  return response.status(400).json({ message: 'Nenhum método encontrado' });
}
