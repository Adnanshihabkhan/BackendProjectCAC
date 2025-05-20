import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudnary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // uload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file has been uploaded succesfully
    console.log("file has uploaded successfully on cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the localy saved temporary file as the upload opration has failed
    return null;
  }
};

export { uploadOnCloudnary };
