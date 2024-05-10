import { prisma } from "@/utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function games(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'GET') {
    const games = await prisma.game.findMany();

    return response.status(200).json(games);
  }
  return response.status(400).json({ message: 'Nenhum método encontrado'});
}