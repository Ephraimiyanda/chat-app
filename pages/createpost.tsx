import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../public/context/AppContext";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import SpinningLoader from "@/app/ui/loaders/spinning-loader";
import { setAttribute } from "video.js/dist/types/utils/dom";

interface User {
  userModel: Object;
}

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState("");
  const userModel = Cookies.get("user");
  const user = JSON.parse(userModel as string);
  const regex = new RegExp(
    /[\/.](jpg|jpeg|png|gif|svg\+xml|JPG|JPEG|SVG|svg|PNG|GIF)$/i
  );
  const isImagePreview = regex.test(selectedImage.type);
  const router = useRouter();
  const video = useRef<HTMLVideoElement | null>(null);
  const currentVideo = video.current;
  
  // Function to handle image upload to Cloudinary
  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedImage);
      formData.append("api_key", "743174149656362");
      formData.append("upload_preset", "j1d4ychj");
      const uploadRes = await fetch(
        "https://api.cloudinary.com/v1_1/dg0kdnwt1/auto/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const Pic = await uploadRes.json();
      if (Pic.url) {
        const imageUrl=Pic.secure_url ;
        const cloudinaryId=Pic.asset_id
        
        return{imageUrl,cloudinaryId}
        
      }

    } catch (error) {
     
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Check if an image is selected before attempting to upload
    if (selectedImage) {
      setLoading("loading");

      try {
        const{ imageUrl,cloudinaryId}:any = await handleImageUpload();
        await handleImageUpload();

        const postToUpload = {
          sender: user._id,
          cloudinaryId: cloudinaryId,
          text: postContent,
          content: imageUrl,
        };

        const createPostRes = await fetch(
          "https://ephraim-iyanda.onrender.com/user/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postToUpload),
          }
        );

        if (createPostRes.ok) {
          setLoading("successful");
          setSelectedImage(false);
        } else {
          setLoading("error");
        }
      } catch (error) {
        console.error("Image upload and post creation error:", error);
        setLoading("error");
      }
    } else {
      console.warn("Please select an image before posting.");
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostContent(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      setSelectedImage(imageFile);
      // Create a preview URL for the selected image
      const imageURL = URL.createObjectURL(imageFile);
      setImagePreview(imageURL);
    }
  };

  return (
    <div
      className="fixed w-full h-full flex justify-center items-center bg-[#00000080] z-[5]"
      onClick={() => {
        router.back();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-[94%] sm:w-[550px] h-[70%] bg-white m-auto bg white relative rounded-md"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {!selectedImage ? (
          <div className="flex flex-col justify-center items-center h-full">
            <button
              className="close p-2 w-10 bg-black text-white text-xl ml-auto absolute top-[0] right-[0]"
              onClick={() => {
                router.back();
              }}
            >
              x
            </button>
            <label htmlFor="imageInput" className="label flex">
              <input
                type="file"
                id="imageInput"
                name="imageInput"
                accept=".png, .jpg, .jpeg, .svg, .mp4, .gif, .mkv"
                onChange={handleImageChange}
                className="createPostInput"
              />
            </label>
            <span className="text-center p-2">
              Drag image to the icon or click to upload a post
            </span>
          </div>
        ) : (
          <div className="w-full h-full relative">
            <button
              className="absolute z-[3] back-btn bg-black text-white px-4 py-2"
              onClick={() => {
                setPostContent("");
                setSelectedImage("");
                setImagePreview("");
              }}
            >
              ← Back
            </button>
            {isImagePreview ? (
              <Image
                src={imagePreview}
                alt="Preview"
                className="object-contain max-w-full w-full h-full rounded-md"
                width={100}
                height={100}
              />
            ) : (
              <video
                className=" h-full rounded-md object-cover "
                ref={video}
                controls
                onFocus={() => {
                  currentVideo && currentVideo.play();
                }}
                src={imagePreview}
              ></video>
            )}
            <div className="absolute z-[2] h-fit mt-[68%] inset-0 flex flex-col items-center justify-end p-6">
              <div>
                <div className="flex gap-2">
                  <input
                    id="postContent"
                    name="postContent"
                    value={postContent}
                    onChange={handleInputChange}
                    placeholder="What's the caption on your mind?"
                    className="border border-black rounded-md bg-[#f0f5fa] w-full p-2 mb-2"
                    onKeyPress={(event) => {
                      event.key === "Enter" && handleSubmit(event);
                    }}
                  />
                  <button
                    type="submit"
                    className={`bg-black text-white h-10 px-4 py-1 rounded-md ${
                      loading === "loading" ? "cursor-none" : "cursor-pointer"
                    }`}
                  >
                    {" "}
                    {loading === "loading" ? (
                      <SpinningLoader />
                    ) : loading === "successful" ? (
                      "posted"
                    ) : loading === "error" ? (
                      "retry"
                    ) : (
                      "post"
                    )}
                  </button>
                </div>

                {loading === "error" && (
                  <p className="text-red-600">
                    an error occurred while uploading the post
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
