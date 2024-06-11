import { NotFoundError } from '@/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError, z } from 'zod';
import { CreateGameUseCase } from './createGameUseCase';
import { DeleteGameUseCase } from './deleteGameUseCase';
import { GetAllGamesUseCase } from './getAllGamesUseCase';

export default async function games(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'GET') {
    const getAllGamesUseCase = new GetAllGamesUseCase();
    const games = await getAllGamesUseCase.execute();

    return response.status(200).json(games);
  }

  if (request.method === 'POST') {
    try {
      const createGameSchema = z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        dice: z.string().min(1),
        themes: z.array(z.string()).min(1),
        gameplay_focus: z.string().min(1)
      });
      const { title, description, dice, themes, gameplay_focus } = createGameSchema.parse(
        request.body
      );

      const createGameUseCase = new CreateGameUseCase();
      const game = await createGameUseCase.execute({
        title,
        description,
        dice,
        themes,
        gameplay_focus
      });

      return response.status(200).json(game);
    } catch (err) {
      if (err instanceof ZodError) {
        return response.status(422).json({
          message: 'Incomplete or invalid data',
          error: err.errors
        });
      }
      if (err instanceof NotFoundError) {
        return response.status(404).json({
          message: err.message
        });
      }
      throw err;
    }
  }

  if (request.method === 'DELETE') {
    const { id } = request.body;

    const deleteGameUseCase = new DeleteGameUseCase();
    await deleteGameUseCase.execute({ id });

    return response.status(201).json({ message: 'Jogo deletado com sucesso.' });
  }

  return response.status(400).json({ message: 'Nenhum método encontrado' });
}
