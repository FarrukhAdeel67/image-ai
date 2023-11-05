import multer from "multer";
//middleware
const storage = multer.memoryStorage();
const singleUpload = multer({ storage }).single("file");
//here for single file we used single for many array option is used and file name here must be same as req.file.
export default singleUpload;
