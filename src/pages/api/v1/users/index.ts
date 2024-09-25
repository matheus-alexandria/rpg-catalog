import { ConflictError } from '@/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError, z } from 'zod';
import { CreateUserUseCase } from './createUserUseCase';

export default async function users(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    try {
      const userCreateSchema = z.object({
        login: z.string(),
        password: z.string().min(6, { message: 'the password must be at least 6 characters long' }),
        role: z.enum(['ADMIN', 'USER', 'CREATOR']).optional().default('USER')
      });
      const { login, password, role } = userCreateSchema.parse(request.body);
      const createUserUseCase = new CreateUserUseCase();
      const user = await createUserUseCase.execute({ login, password, role });

      return response.status(201).json({
        user
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

  return response.status(404).json({
    message: 'No method was found'
  });
}
