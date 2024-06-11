import { NextApiRequest, NextApiResponse } from 'next';

export default async function games(request: NextApiRequest, response: NextApiResponse) {
  // TODO: getOne game route
  const id = request.query.gameId;
  return response.status(200).json({
    id
  });
}
