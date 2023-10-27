import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
dotenv.config()

//configure cloudinary env variables
//keys should be from the cloduianry docs environment variables.
cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_NAME,
        secure: true,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    }
);
export default cloudinary 