import formidable, { Fields, File, Files } from 'formidable';
import { NextApiRequest } from 'next';

export async function parseForm(
  req: NextApiRequest
): Promise<{ parsedFields: Record<string, any>; file: File | undefined }> {
  return new Promise((resolve, rejects) => {
    const form = formidable({
      maxFiles: 1,
      maxFileSize: 1024 * 1024 * 2
    });

    form.parse(req, (err: any, fields: Fields, files: Files) => {
      const parsedFields = parseFields(fields);
      const firstFile = files?.file?.[0];
      if (err) {
        return rejects(err.message);
      }
      resolve({ parsedFields, file: firstFile });
    });
  });
}

function parseFields(fields: Fields): Record<string, any> {
  const parsed: Record<string, any> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value?.length && value.length > 1) {
      parsed[key] = value;
    }

    if (value?.length && value.length === 1) {
      parsed[key] = value[0];
    }
  }
  return parsed;
}
