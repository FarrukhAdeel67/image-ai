import { catchAsyncError } from "../middlewares/catchAsyncError.js";

import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";

import { Picture } from "../models/Image.js";

//get all images
export const getAllImages = catchAsyncError(async (req, res, next) => {

  const pictures = await Picture.find()
  return res.status(200).json({
    success: true,
    pictures,
  });
});

export const createImage = catchAsyncError(async (req, res, next) => {
  const file = req.file;
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
  const picture = await Picture.create({
    poster: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
   await picture.save();
  return res.status(201).json({
    success: true,
    picture,
    message: "Image Uploaded Successfully",
  });
});