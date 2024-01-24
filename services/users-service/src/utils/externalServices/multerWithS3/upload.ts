import { Request } from 'express';
import { S3Client } from '@aws-sdk/client-s3'
import multer from 'multer'
import multers3 from 'multer-s3'
import path from 'path';

interface File extends Express.Multer.File {}

const s3 = new S3Client({
  region: String(process.env.S3_BUCKET_REGION),
  credentials: {
    accessKeyId: String(process.env.S3_BUCKET_ACCESS_KEY),
    secretAccessKey: String(process.env.S3_SECRET_ACCESS_KEY)
  }
})

const upload = multer({
  storage: multers3({
    s3: s3,
    bucket: String(process.env.S3_PRODUCT_BUCKET_NAME),
    metadata: ( req: Request, file: any, cb: any) => {
      cb(null, { fieldName: file.fieldName})
    },
    key: (req: Request, file: File, cb: any) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  })
})


export default upload;