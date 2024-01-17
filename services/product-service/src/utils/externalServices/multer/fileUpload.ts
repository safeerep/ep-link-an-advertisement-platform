import { Request } from 'express';
import multer, { Multer } from 'multer';
import path from 'path';

interface File extends Express.Multer.File {}

const storage = multer.diskStorage({
  destination: (req: Request, file: File, cb: any) => {
    cb(null, 'src/infra/imageStorage/products');
  },
  filename: (req: Request, file: File, cb: any) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload: Multer = multer({ storage });

export default upload;