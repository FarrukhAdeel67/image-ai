import mongoose from "mongoose";
const schema = new mongoose.Schema({

  poster: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export const Picture = mongoose.model("Image", schema);
