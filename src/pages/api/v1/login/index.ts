import { NotFoundError } from '@/errors';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError, z } from 'zod';
import { LoginUseCase } from './LoginUseCase';

export default async function login(request: NextApiRequest, response: NextApiResponse) {
  if (request?.method === 'POST') {
    try {
      const bodySchema = z.object({
        login: z.string(),
        password: z.string()
      });
      const { login, password } = bodySchema.parse(request.body);
      const loginUseCase = new LoginUseCase();
      const user = await loginUseCase.execute({ login, password });
      return response.status(200).json({
        user
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

  return response.status(404).json({
    message: 'No method was found'
  });
}
