import { NotFoundError } from '@/errors';
import { parseForm } from '@/utils/parseForm';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError, z } from 'zod';
import { CreateGameUseCase } from '../createGameUseCase';

export default async function create(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    try {
      const { parsedFields: fields, file } = await parseForm(request);
      const createGameSchema = z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        dice: z.string().min(1),
        themes: z.array(z.string()).min(1).or(z.string().min(1)),
        gameplay_focus: z.string().min(1)
      });
      const { title, description, dice, themes, gameplay_focus } = createGameSchema.parse(fields);

      const createGameUseCase = new CreateGameUseCase();
      const game = await createGameUseCase.execute({
        title,
        description,
        dice,
        themes: typeof themes === 'string' ? [themes] : themes,
        gameplay_focus,
        file
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
}

export const config = {
  api: {
    bodyParser: false
  }
};
