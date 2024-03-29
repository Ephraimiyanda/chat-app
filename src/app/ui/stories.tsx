import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import useSWR from "swr";
import { Fetcher } from "swr/_internal";
import ContactProps from "./contactProps";
import Loader from "./loader";
import share from "./images/share.png";
import comment from "./images/comment.png";
import like from "./images/like.png";
import bookmark from "./images/bookmark.png";
import unlike from "../ui/images/heart-svgrepo-com.svg";
import Cookies from "js-cookie";
import StorySection from "./postComponent";
import { Spinner } from "@nextui-org/react";
interface Follower {
  sender: string;
  avatar: string;
  name: string;
  dateJoined: string;

  user: {
    avatar: string;
    name: string;
    dateJoined: string;
    _id: string | number;
  };
}

interface posts {
  text: string;
  sender: string;
  _id: string;
  content: string;
  dateJoined: string;
  avatar: string;
}
interface CurrentPostIndexes {
  [followerId: string]: { [currentDate: string]: number };
}

export default function Stories() {
  const video = useRef<HTMLVideoElement | null>(null);
  const [follower, setFollower] = useState<Follower[]>([]);
  const regex = new RegExp(
    /[^\s]+(.*?).(jpg|jpeg|png|gif|svg\+xml|JPG|JPEG|SVG|svg|PNG|GIF)$/
  );
  const fetcher: Fetcher<posts[]> = async (url: string) => {
    try {
      const res = await fetch(url,{ cache: 'force-cache' });
      const sortedData = await res.json();
      return sortedData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const {
    data: sortedData,
    error: followersError,
    isLoading: isLoadingFollowers,
  } = useSWR<posts[]>(
    "https://ephraim-iyanda.onrender.com/user/post/allPosts",
    fetcher,
    {
      refreshInterval: 10000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateIfStale: true,
    }
  );

  useEffect(() => {
    if (sortedData) {
      Promise.all(
        sortedData.map((followerId: any) => {
          return fetch(
            `https://ephraim-iyanda.onrender.com/user/${followerId.sender}`,{ cache: 'force-cache' }
          )
            .then((res) => res.json())
            .then((data) => {
              setFollower((followers: any) => [...followers, data]);
            })
            .catch((error) => {
              console.error("Error fetching follower data:", error);
            });
        })
      );
    }
  }, [sortedData]);



  const renderFollowerInfo = (sender: string) => {
    const followerInfo = follower.find((f: any) => f.user._id === sender);

    if (followerInfo) {
      const { avatar, name, dateJoined, _id } = followerInfo.user;

      return (
        <div>
          <ContactProps
            _id={_id}
            contactAvatar={avatar}
            contactName={name}
            contactText={`About ${new Date(dateJoined)
              .toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })
              .toLocaleLowerCase()} on ${new Date(dateJoined).toDateString()}`}
          />
        </div>
      );
    }

    return null; // Return null if follower information is not available
  };
  // const handlePrevPost = (followerId: string, currentDate: string) => {
  //   setCurrentPostIndexes((prevState) => {
  //     const currentIndex = prevState[followerId]?.[currentDate] || 0;
  //     const updatedIndexes: CurrentPostIndexes = {
  //       ...prevState,
  //       [followerId]: {
  //         ...prevState[followerId],
  //         [currentDate]: Math.max(currentIndex - 1, 0),
  //       },
  //     };
  //     return updatedIndexes;
  //   });
  // };

  // const handleNextPost = (followerId: string, currentDate: string) => {
  //   const follower =
  //     sortedData && sortedData.find((follower) => follower._id === followerId);
  //   if (follower) {
  //     setCurrentPostIndexes((prevState) => {
  //       const currentIndex = prevState[followerId]?.[currentDate] || 0;
  //       const updatedIndexes: CurrentPostIndexes = {
  //         ...prevState,
  //         [followerId]: {
  //           ...prevState[followerId],
  //           [currentDate]: Math.min(
  //             currentIndex + 1,
  //             follower.posts.length - 1
  //           ),
  //         },
  //       };
  //       return updatedIndexes;
  //     });
  //   }
  // };

  const handleLike = (postId: string) => {
    // Implement your like functionality here
    // You may want to use a state management library like Redux or a custom hook
  };

  return (
    <div className="home max-w-[600px] flex flex-col gap-5  ml-auto mr-auto md:pl-2 md:pr-2 pt-1 pb-10">
           {sortedData ?
        sortedData.map((post: posts, index: number) => (
          <StorySection
            key={`${post._id}-${post.dateJoined}`}
            post={post}
            renderFollowerInfo={renderFollowerInfo}
            
          />
        )):<div className="flex items-center justify-center"><Spinner/></div>}
    </div>
  );
}
