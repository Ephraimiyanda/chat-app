import React, { useState, useEffect, ReactElement } from "react";
import Image from "next/image";
import Loader from "@/app/ui/loader";

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

  const chunkArray = (array: Post[], chunkSize: number) => {
    const chunkedArray: Post[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const postsChunks = chunkArray(posts, 3); // Split posts into groups of 5

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-screen overflow-auto pb-20 p-2">
      {postsChunks? postsChunks.map((chunk, index) => (
        <div key={index} className="grid gap-4">
          {chunk.map((post: Post) => (
            <div key={post._id}>
              <Image
                src={post.content}
                width={100}
                height={100}
                alt="post"
                className="h-auto w-full  rounded-lg"
              />
            </div>
          ))}
        </div>
      )): <Loader/>}
    </div>
  );
}
