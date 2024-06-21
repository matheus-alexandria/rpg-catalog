import formidable, { Fields, Files } from 'formidable';
import { NextApiRequest } from 'next';

export async function parseForm(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
  return new Promise((resolve, rejects) => {
    const form = formidable({
      maxFiles: 10,
      maxFileSize: 1024 * 1024 * 10
    });

    form.parse(req, (err: any, fields: Fields, files: Files) => {
      if (err) {
        return rejects(err.message);
      }
      resolve({ fields, files });
    });
  });
}
