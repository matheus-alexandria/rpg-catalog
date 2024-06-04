import { NextApiRequest, NextApiResponse } from 'next';
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
    const { title, description, dice, theme, gameplay_focus } = request.body;

    const createGameUseCase = new CreateGameUseCase();
    const game = await createGameUseCase.execute({
      title,
      description,
      dice,
      theme,
      gameplay_focus
    });

    return response.status(200).json(game);
  }

  if (request.method === 'DELETE') {
    const { id } = request.body;

    const deleteGameUseCase = new DeleteGameUseCase();
    await deleteGameUseCase.execute({ id });

    return response.status(201).json({ message: 'Jogo deletado com sucesso.' });
  }

  return response.status(400).json({ message: 'Nenhum método encontrado' });
}
