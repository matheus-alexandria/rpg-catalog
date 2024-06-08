import { ConflictError } from '@/pages/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError, z } from 'zod';
import { CreateThemeUseCase } from './createThemeUseCase';

export async function themes(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    try {
      const createDataSchema = z.object({
        name: z.string(),
        description: z.string()
      });
      const { name, description } = createDataSchema.parse(request.body);
      const createThemeUseCase = new CreateThemeUseCase();
      const theme = await createThemeUseCase.execute({ name, description });

      return response.status(201).json({
        theme
      });
    } catch (err) {
      if (err instanceof ZodError) {
        return response.status(422).json({
          message: 'Incomplete or invalid data',
          error: err.errors
        });
      }

      if (err instanceof ConflictError) {
        return response.status(err.status).json({
          message: err.message
        });
      }

      throw err;
    }
  }
  return response.status(400).json({
    message: 'No method was found'
  });
}
