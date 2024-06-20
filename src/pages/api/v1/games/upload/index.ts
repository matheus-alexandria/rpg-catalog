import { readFile } from 'node:fs/promises';
import { parseForm } from '@/utils/parseForm';
import { uploadFile } from '@/utils/s3';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function uploadCoverImage(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === 'POST') {
    const { fields, files } = await parseForm(request);

    const file = files?.file?.[0];
    const path = file?.filepath;
    if (path) {
      const fileContent = await readFile(path);
      const key = `upload/${file.originalFilename}`;

      try {
        const bucketName = process.env.S3_BUCKET_NAME;
        const result = await uploadFile(fileContent, bucketName ?? '', key);
        return response.status(200).json({ url: result.Location });
      } catch (e: any) {
        return response.status(400).json({ message: e.message });
      }
    }

    return response.status(200).json({ message: 'Fodac' });
  }

  return response.status(404).json({
    message: 'No method found.'
  });
}

export const config = {
  api: {
    bodyParser: false
  }
};
