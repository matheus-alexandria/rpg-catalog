import { NextApiRequest, NextApiResponse } from 'next';

export default async function games(request: NextApiRequest, response: NextApiResponse) {
  const id = request.query.gameId;
  return response.status(200).json({
    id
  });
}
