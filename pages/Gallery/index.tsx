import React, { useState, useEffect, ReactElement } from "react";
import Image from "next/image";

interface Post {
  _id: string;
  content: string;
}

export default function Gallery(): ReactElement {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async (): Promise<void> => {
    try {
      const res = await fetch("https://ephraim-iyanda.onrender.com/user/post/allPosts");
      const sortedData = await res.json();
      console.log(sortedData);
      setPosts(sortedData);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-1 py-2 lg:px-32 lg:pt-4 overflow-y-auto h-[100vh] bg-white pb-20">
      <div className="-m-1 flex flex-wrap md:-m-2">
      <div className="flex w-full flex-wrap">
    {posts && posts.map((post:Post)=>(

        <div
         className="w-[50%] p-1 md:p-2"
         key={post._id}>
          <Image
           
            src={post.content}
            width={100}
            height={100}
            alt="post"
            className="block h-full w-[100%]  rounded-lg object-cover object-center"
            />
        </div>
        ))}
      </div>
    </div>
    </div>
  );
}
