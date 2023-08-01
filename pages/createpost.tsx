import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../public/context/AppContext";
import Image from "next/image";
import Cookies from "js-cookie";
import VideoPlayer from "@/app/ui/videoPlayer";
import { useRouter } from "next/router";
import SpinningLoader from "../src/app/ui/loaders/spinning-loader";

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [imagePreview, setImagePreview] = useState("");
  const { setShowCreatePost, showCreatePost } = useContext(AppContext);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState("");
  const userModel = Cookies.get("user");
  const [cloudinaryId, setCloudinaryId] = useState("");
  const user = JSON.parse(userModel as string);
  const regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);
  const isImagePreview = selectedImage && regex.test(selectedImage.type);

  const router = useRouter();

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

      setLoading("idle");
      const Pic = await uploadRes.json();
      if (Pic.url) {
        setImageUrl(Pic.secure_url);
        setCloudinaryId(Pic.asset_id);
        return Pic.secure_url;
      }
      if (!uploadRes.ok) {
        setLoading("error");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      setLoading("error");
    }
  };

  const createPostWithImageUrl = async () => {
    try {
      const postToUpload = {
        sender: user._id,
        cloudinaryId: cloudinaryId,
        text: postContent,
        content: await handleImageUpload(),
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

      setLoading("idle");
      if (createPostRes.ok) {
        setShowCreatePost(!showCreatePost);
        setLoading("successful");
      } else {
        setLoading("error");
      }

      console.log(await createPostRes.json());
    } catch (error) {
      console.error("Post creation error:", error);
      setLoading("error");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostContent(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files && event.target.files[0]; // Fixed: Check for selected files
    setSelectedImage(imageFile);
    // Create a preview URL for the selected image
    if (imageFile) {
      const imageURL = URL.createObjectURL(imageFile);
      setImagePreview(imageURL);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createPostWithImageUrl();
  };

  return (
    <div
      className="fixed w-full h-full flex justify-center items-center bg-[#00000080] z-[5]"
      onClick={() => {
        router.back();
      }}
    >
      <form
        onSubmit={(event) => {
          setLoading("idle");
          handleSubmit(event);
        }}
        className="w-[94%] sm:w-[550px] h-[70%] bg-white m-auto bg white relative rounded-md"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {!selectedImage ? (
          <div className="flex flex-col justify-center items-center h-full">
            <button
              className="close p-2 w-10 bg-black text-white text-xl ml-auto absolute top-[0] right-[0] "
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
                className="object-cover max-w-full w-full h-full rounded-md"
                width={100}
                height={100}
              />
            ) : (
              <VideoPlayer src={imagePreview} />
            )}
            <div className="absolute z-[2] h-fit mt-auto inset-0 flex flex-col items-center justify-end p-6">
              <div>
                <input
                  id="postContent"
                  name="postContent"
                  value={postContent}
                  onChange={handleInputChange}
                  placeholder="What's the caption on your mind?"
                  className="border border-black rounded-md bg-[#f0f5fa] w-full p-2 mb-2"
                />
                <button
                  type="submit"
                  className={`bg-black text-white px-4 py-2 rounded-md ${
                    loading === "idle" ? "cursor-none opacity-[85]" : "cursor-pointer"
                  }`}
                >
                  {loading === "idle" ? (
                    <SpinningLoader />
                  ) : loading === "successful" ? (
                    "posted"
                  ) : loading === "error" ? (
                    "retry"
                  ) : (
                    "post"
                  )}
                </button>
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
