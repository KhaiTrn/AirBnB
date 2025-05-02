import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import {
  API_KEY,
  API_SECRET,
  CLOUD_NAME,
} from 'src/common/constant/app.constant';
@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });
  }
  async uploadImage(file: any, folder: string) {
    return await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: folder }, (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        })
        .end(file.buffer);
    });
  }
}
