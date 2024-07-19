import { readFile } from 'node:fs/promises';
import { NotFoundError } from '@/errors';
import { BadRequestError } from '@/errors/BadRequestError';
import { prisma } from '@/utils/prisma';
import { uploadFile } from '@/utils/s3';
import { File } from 'formidable';

export class CreateGameUseCase {
  async execute(params: CreateGameParams) {
    const { title, description, dice, themes, gameplay_focus, file } = params;

    const foundThemes = await prisma.theme.findMany({
      where: {
        name: {
          in: themes
        }
      }
    });

    if (!foundThemes.length) {
      throw new NotFoundError('No themes found with the given names.');
    }

    let pathToS3File: string | null = null;
    if (file) {
      const path = file?.filepath;
      if (path) {
        const fileContent = await readFile(path);
        const key = `upload/${file.originalFilename}-${new Date()}`;

        try {
          const bucketName = process.env.S3_BUCKET_NAME;
          const result = await uploadFile(fileContent, bucketName ?? '', key);
          pathToS3File = result.Location;
        } catch (e: any) {
          throw new BadRequestError(`Erros while uploading the file: ${e?.message}`);
        }
      }
    }

    const game = await prisma.game.create({
      data: {
        title,
        description,
        dice,
        cover_path: pathToS3File,
        game_themes: {
          createMany: {
            data: foundThemes.map((theme) => ({
              theme_id: theme.id,
              is_main: false
            }))
          }
        },
        gameplay_focus
      },
      include: {
        game_themes: {
          include: {
            theme: { select: { name: true } }
          }
        }
      }
    });

    return game;
  }
}

interface CreateGameParams {
  title: string;
  description: string;
  dice: string;
  themes: string[];
  gameplay_focus: string;
  file?: File;
}
