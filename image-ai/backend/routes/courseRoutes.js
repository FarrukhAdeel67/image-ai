import express from "express";
import {

  createImage, getAllImages,

} from "../controllers/imageController.js";
import singleUpload from "../middlewares/multer.js";
const router = express.Router();
//get all courses
router.route("/courses").get(getAllImages);
router.route("/createimage").post( singleUpload, createImage);


export default router;
