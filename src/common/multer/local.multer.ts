import { diskStorage } from 'multer';
import * as fs from 'fs';
import { extname } from 'path';
fs.mkdirSync('upload', { recursive: true });
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    console.log(file);
    const originalname = file.originalname;
    const fileExtension = extname(file.originalname);
    const fileName = `local-${uniqueSuffix}-${originalname}${fileExtension}`;
    cb(null, fileName);
  },
});

const uploadLocal = {
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
};
export default uploadLocal;
