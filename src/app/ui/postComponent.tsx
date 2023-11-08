import React from "react";
import Image from "next/image";
import share from "./images/share.png";
import comment from "./images/comment.png";
import unlike from "../ui/images/heart-svgrepo-com.svg";
import bookmark from "./images/bookmark.png";
import {useState,useEffect} from "react"
import Cookies from "js-cookie";
interface postintrface{
    post:any;
    renderFollowerInfo:Function;
}

const StorySection = ({ post, renderFollowerInfo }:postintrface) => {
  const[isLiked,setIsLiked]=useState()
  const userModel = Cookies.get("user");
  const user = JSON.parse(userModel as string);
  const { _id, sender, dateJoined, content, text } = post;
  const likePost = async (postId: string) => {
    const userId = {
      userId: _id
    };
    try {
      
      const likeRes = await fetch(
        `https://ephraim-iyanda.onrender.com/user/likePost/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userId),
        }
      );
      const likeResData = await likeRes.json();
    } catch (error) {
      console.log(error);
    }
  };
  const unLikePost = async (postId: string) => {
    const userId = {
      userId: _id
    };
    try {
      
      const likeRes = await fetch(
        `https://ephraim-iyanda.onrender.com/user/unlikePost/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userId),
        }
      );
      const unlikeResData = await likeRes.json();
    } catch (error) {
      console.log(error);
    }
  };
  const PostLikes = async () => {
    try {
      
      const likeListRes = await fetch(
        `https://ephraim-iyanda.onrender.com/user/likedPosts/${_id}/${user._id}`);
      const likesListData = await likeListRes.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    PostLikes()
  },[])
  return (
    <section id={`${_id}`} className="pl-3 pr-3 pt-3 rounded-lg bg-white w-full max-w-[550px] m-auto box-shadow">
      <div className="pb-2">
        {renderFollowerInfo(sender)}
        <p className="pt-1 pb-1 max-w-[550px] border-b border-b-stone-300">
          {text}
        </p>
      </div>
      <div className="relative rounded-lg">
        <div className="h-fit">
          {content.match(/\.(jpg|jpeg|png|gif|svg\+xml|JPG|JPEG|SVG|svg|PNG|GIF)$/) ? (
            <Image
              src={content}
              className="rounded-lg h-auto w-full"
              alt="story picture"
              width={550}
              height={100}
            />
          ) : (
            <video
              className="h-full rounded-md object-cover"
              controls
              src={content}
            ></video>
          )}
        </div>
        <div className="bottom-0 left-0 w-full pt-3 pb-3 flex items-center justify-between">
          <div className="flex gap-4">
            <button>
              <Image src={unlike} alt="Like" width={26} onClick={() => likePost(_id)} />
            </button>
            <button>
              <Image src={comment} alt="Comment" width={20} />
            </button>
            <button>
              <Image src={share} alt="Share" width={20} />
            </button>
          </div>
          <button>
            <Image src={bookmark} alt="Bookmark" width={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
