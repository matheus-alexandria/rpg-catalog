import { S3 } from 'aws-sdk';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export const uploadFile = (fileContent: any, bucketName: string, key: string) => {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileContent
    // ACL: 'public-read'
  };

  return s3.upload(params).promise();
};
