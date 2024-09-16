import { ConflictError } from '@/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError, z } from 'zod';
import { CreateThemeUseCase } from './createThemeUseCase';
import { DeleteThemeUseCase } from './deleteThemeUseCase';
import { GetAllThemesUseCase } from './getAllThemesUseCase';

export default async function themes(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'GET') {
    const getAllThemesUseCase = new GetAllThemesUseCase();
    const themes = await getAllThemesUseCase.execute();

    return response.status(200).json({
      themes
    });
  }

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

  if (request.method === 'DELETE') {
    try {
      const deleteThemeSchema = z.object({
        id: z.string().uuid()
      });
      const { id } = deleteThemeSchema.parse(request.body);
      const deleteThemeUseCase = new DeleteThemeUseCase();
      await deleteThemeUseCase.execute({ id });

      return response.status(201).json({
        message: 'Tema deletado com sucesso.'
      });
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
  return response.status(404).json({
    message: 'No method was found'
  });
}
