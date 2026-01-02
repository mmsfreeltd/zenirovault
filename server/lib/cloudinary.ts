// server/lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import { config as loadEnv } from "dotenv";

// Load your env vars (only needs to happen once)
loadEnv();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
