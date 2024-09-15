import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError, z } from 'zod';
import { DeleteGameUseCase } from './deleteGameUseCase';
import { GetAllGamesUseCase } from './getAllGamesUseCase';
import { UpdateGameUseCase } from './updateGameUseCase';

export default async function games(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'GET') {
    const getAllGamesUseCase = new GetAllGamesUseCase();
    const games = await getAllGamesUseCase.execute();

    return response.status(200).json(games);
  }

  if (request.method === 'PUT') {
    try {
      console.log(request.body);
      const updateGameSchema = z.object({
        game_id: z.string().uuid(),
        title: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        dice: z.string().min(1).optional(),
        gameplay_focus: z.string().min(1).optional(),
        explanation: z.string().min(1).optional()
      });
      const {
        game_id: gameId,
        title,
        description,
        dice,
        gameplay_focus,
        explanation
      } = updateGameSchema.parse(request.body);

      const updateGameUseCase = new UpdateGameUseCase();
      const game = await updateGameUseCase.execute({
        data: {
          title,
          description,
          dice,
          gameplay_focus,
          explanation
        },
        gameId
      });

      return response.status(200).json(game);
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
