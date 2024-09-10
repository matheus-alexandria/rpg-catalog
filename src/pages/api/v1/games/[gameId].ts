import { NotFoundError } from '@/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError, z } from 'zod';
import { GetOneGamesUseCase } from './getOneGameUseCase';

export default async function games(request: NextApiRequest, response: NextApiResponse) {
  try {
    const querySchema = z.string().uuid();
    const gameId = querySchema.parse(request.query.gameId);
    const getOneGameUseCase = new GetOneGamesUseCase();
    const game = await getOneGameUseCase.execute(gameId);
    return response.status(200).json({
      game
    });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return response.status(err.status).json({
        message: err.message
      });
    }
    if (err instanceof ZodError) {
      return response.status(422).json({
        message: err.format()
      });
    }
    throw err;
  }
}
