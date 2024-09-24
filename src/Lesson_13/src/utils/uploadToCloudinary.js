import { CLOUDINARY } from '../constants/index.js';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  secure: true,
  cloud_name: CLOUDINARY.CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY.CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY.CLOUDINARY_API_SECRET,
});

//?uploadToCloudinary - функція для роботи з Cloudinary.
export function uploadToCloudinary(filePath) {
  return cloudinary.v2.uploader.upload(filePath);
}
