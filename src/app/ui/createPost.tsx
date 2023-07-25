import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../public/context/AppContext';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { json } from 'node:stream/consumers';
interface User{
  userModel:Object
}
export default function CreatePost() {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState("");
  const [imagePreview, setImagePreview] = useState('');
  const { setShowCreatePost } = useContext(AppContext);
  const [imageUrl, setImageUrl] = useState('');
  const userModel= Cookies.get("user")
  const user=JSON.parse(userModel as string);
 // const user=JSON.parse(userModel)
  // Function to handle image upload to Cloudinary
  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedImage);
      formData.append("api_key", "743174149656362");
      formData.append("upload_preset","j1d4ychj")
      const uploadRes = await fetch('https://api.cloudinary.com/v1_1/dg0kdnwt1/auto/upload', {
        method: 'POST',
        body: formData,
      });
      const Pic = await uploadRes.json();
      if (Pic.url) {
        setImageUrl(Pic.secure_url);
      }
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  // Function to create the post after getting the image URL
  const createPostWithImageUrl = async () => {
    try {
      // After successful image upload, you can now submit the post with the image URL
      const postToUpload = {
        sender:user._id,
        text: postContent,
        content: imageUrl,
      };

      // Make a POST request to the backend to create the post with the image URL
      const createPostRes = await fetch('https://ephraim-iyanda.onrender.com/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postToUpload),
      });

      console.log(await createPostRes.json());
    } catch (error) {
      // Handle any errors during post creation
      console.error('Post creation error:', error);
    }
  };

  useEffect(() => {
    if (imageUrl) {
      // Call the function to create the post after getting the image URL
      createPostWithImageUrl();
    }
  }, [imageUrl]);

  const handleHideCreatePost = () => {
    setShowCreatePost(false);
  };

  const handleInputChange = (event:any) => {
    setPostContent(event.target.value);
  };

  const handleImageChange = (event:any) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
    // Create a preview URL for the selected image
    const imageURL = URL.createObjectURL(imageFile);
    setImagePreview(imageURL);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    handleImageUpload(); // Call the function to handle image upload to Cloudinary and post creation
  };

  return (
    <div onClick={handleHideCreatePost} className="fixed w-full h-full flex justify-center align-middle bg-[#00000080] z-[2]">
      <form onSubmit={handleSubmit} className="w-[90%] mt-[20%] sm:w-[600px] h-[70%] bg-white m-auto sm:mt-[3%] bg white relative rounded-md" onClick={(e) => { e.stopPropagation(); }}>
        {!selectedImage ? (
          <div className="flex flex-col justify-center items-center h-full">
            <label htmlFor="imageInput" className="label flex">
              <input
                type="file"
                id="imageInput"
                name="imageInput"
                accept=".png, .jpg, .jpeg, .svg"
                onChange={handleImageChange}
                className="createPostInput"
              />
            </label>
            <span className=' text-center p-2'>Drag image to the icon or click to upload a post</span>
          </div>
        ) : (
          <div className="w-full h-full relative">
            <button
              className="absolute z-[2] back-btn bg-black text-white px-4 py-2"
              onClick={() => {
                setPostContent('');
                setSelectedImage("");
                setImagePreview('');
              }}
            >
              ← Back
            </button>
            <Image src={imagePreview} alt="Preview" className="object-cover max-w-full w-full h-full rounded-md" width={100} height={100} />
            <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
              <div>
                <input
                  id="postContent"
                  name="postContent"
                  value={postContent}
                  onChange={handleInputChange}
                  placeholder="What's the caption on your mind?"
                  className="border border-black rounded-md bg-[#f0f5fa] w-full p-2 mb-2"
                />
                <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
