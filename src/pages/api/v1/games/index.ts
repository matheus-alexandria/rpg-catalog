import { NextApiRequest, NextApiResponse } from "next";

export default function games(request: NextApiRequest, response: NextApiResponse) {
  return response.status(200).json({ message: 'respondendo'});
}