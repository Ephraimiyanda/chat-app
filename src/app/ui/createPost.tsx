import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../public/context/AppContext";
import Image from "next/image";
import Cookies from "js-cookie";
import VideoPlayer from "@/app/ui/videoPlayer";
import { useRouter } from "next/router";
interface User {
  userModel: Object;
}
export default function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [imagePreview, setImagePreview] = useState("");
  const { setShowCreatePost, showCreatePost } = useContext(AppContext);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, isLoading] = useState("");
  const userModel = Cookies.get("user");
  const [cloudinaryId, setCloudinaryId] = useState("");
  const user = JSON.parse(userModel as string);
  const regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);
  const isImagePreview = regex.test(selectedImage.type);
  const router = useRouter();

  // const user=JSON.parse(userModel)
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
      isLoading("idle");
      const Pic = await uploadRes.json();
      if (Pic.url) {
        setImageUrl(Pic.secure_url);
        setCloudinaryId(Pic.asset_id);
      }
      if (!uploadRes.ok) {
        isLoading("error");
      }
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  // Function to create the post after getting the image URL
  const createPostWithImageUrl = async () => {
    try {
      // After successful image upload, you can now submit the post with the image URL
      const postToUpload = {
        sender: user._id,
        cloudinaryId: cloudinaryId,
        text: postContent,
        content: imageUrl,
      };

      // Make a POST request to the backend to create the post with the image URL
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
      isLoading("idle");
      if (createPostRes.ok) {
        setShowCreatePost(!showCreatePost);
        isLoading("successfull");
      } else {
        isLoading("error");
      }

      console.log(await createPostRes.json());
    } catch (error) {
      // Handle any errors during post creation
      console.error("Post creation error:", error);
    }
  };

  useEffect(() => {
    if (imageUrl) {
      createPostWithImageUrl();
    }
  }, [imageUrl]);

  const handleInputChange = (event: any) => {
    setPostContent(event.target.value);
  };

  const handleImageChange = (event: any) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
    // Create a preview URL for the selected image
    const imageURL = URL.createObjectURL(imageFile);
    setImagePreview(imageURL);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    handleImageUpload(); // Call the function to handle image upload to Cloudinary and post creation
  };

  return (
    <div
      className="fixed w-full h-full flex justify-center items-center bg-[#00000080] z-[5]"
      onClick={() => {
        router.back();
      }}
    >
      <form
        onSubmit={(event: any) => {
          isLoading("idle");
          handleSubmit(event);
        }}
        className="w-[94%]  sm:w-[550px] h-[70%] bg-white m-auto  bg white relative rounded-md"
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
                    loading === "idle" ? "cursor-none" : "cursor-pointer"
                  }`}
                >
                  {loading === "idle"
                    ? "...posting"
                    : loading === "successful"
                    ? "posted"
                    : loading === "error"
                    ? "retry"
                    : "post"}
                </button>
                {loading === "error" && (
                  <p className="text-red-600">
                    "an error occurred while uploading the post"
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
