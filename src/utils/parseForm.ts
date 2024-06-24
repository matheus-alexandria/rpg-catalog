import formidable, { Fields, Files } from 'formidable';
import { NextApiRequest } from 'next';

export async function parseForm(
  req: NextApiRequest
): Promise<{ parsedFields: Record<string, any>; files: Files }> {
  return new Promise((resolve, rejects) => {
    const form = formidable({
      maxFiles: 1,
      maxFileSize: 1024 * 1024 * 2
    });

    form.parse(req, (err: any, fields: Fields, files: Files) => {
      const parsedFields = parseFields(fields);
      if (err) {
        return rejects(err.message);
      }
      resolve({ parsedFields, files });
    });
  });
}

function parseFields(fields: Fields): Record<string, any> {
  const parsed: Record<string, any> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value) {
      parsed[key] = value[0];
    }
  }
  return parsed;
}
