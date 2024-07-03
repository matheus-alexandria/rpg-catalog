import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError, z } from 'zod';
import { DeleteGameUseCase } from './deleteGameUseCase';
import { GetAllGamesUseCase } from './getAllGamesUseCase';

export default async function games(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'GET') {
    const getAllGamesUseCase = new GetAllGamesUseCase();
    const games = await getAllGamesUseCase.execute();

    return response.status(200).json(games);
  }

  if (request.method === 'DELETE') {
    try {
      const deleteGameSchema = z.object({
        id: z.string().uuid()
      });
      const { id } = deleteGameSchema.parse(request.body);

      const deleteGameUseCase = new DeleteGameUseCase();
      await deleteGameUseCase.execute({ id });

      return response.status(201).json({ message: 'Jogo deletado com sucesso.' });
    } catch (err) {
      if (err instanceof ZodError) {
        return response.status(422).json({
          message: 'Incomplete or invalid data',
          error: err.errors
        });
      }

      throw err;
    }
  }

  return response.status(400).json({ message: 'Nenhum método encontrado' });
}
