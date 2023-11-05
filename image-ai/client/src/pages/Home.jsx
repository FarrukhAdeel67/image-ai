

import React, { useState } from "react";
import axios from "axios";
import { preview } from "../assets";
import { Loader } from "../components";


const UploadImage = () => {
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("file", image);

    try {
      setUploadingImage(true);
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const { data } = await axios.post(
        `http://localhost:4000/api/v1/createimage`,
        myForm,
        config
      );
      console.log(data);

      setImage("");
      setImagePrev("");

      document.getElementById('imageInput').value = ''; 

    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="w-full">
      <div className=" items-center justify-center">
        <div className="p-8">
          <form onSubmit={submitHandler} className="w-full max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center md:text-left mb-8">
              Add Image
            </h1>
            <div className="space-y-4">
              <input
                accept="image/*"
                required
                type="file"
                id="imageInput" 
                className="w-full border-b-2 mb border-purple-300 focus:outline-none focus:border-purple-500"
                onChange={changeImageHandler}
              />
              {imagePrev ? (
                <img
                  src={imagePrev}
                  alt={preview} 
                  className="w-9/12 h-9/12 object-contain mx-auto"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className="w-6/12 h-6/12 object-contain opacity-40"
                />
              )}

              {uploadingImage && (
                <div className="absolute inset-0 z-0 flex justify-center items-center rounded-lg bg-[rgba(0,0,0,0.5)]">
                  <Loader />
                </div>
              )}
              <button
                className="w-full bg-purple-500 text-white py-2 rounded-md"
                type="submit"
              >
                {uploadingImage ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
