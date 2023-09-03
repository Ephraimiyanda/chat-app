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

interface Follower {
  followers: any;
  timestamp: string | number | Date;
  name: string;
  _id: string;
  avatar: string;
  posts: {
    _id: string;
    content: string;
    dateJoined: string;
    text: string;
  }[];
}

interface CurrentPostIndexes {
  [followerId: string]: { [currentDate: string]: number };
}

export default function Stories() {
  const [activeFollowerIndex, setActiveFollowerIndex] = useState(-1);
  const [currentPostIndexes, setCurrentPostIndexes] = useState<CurrentPostIndexes>(
    {}
  );
  const regex = new RegExp(
    /[^\s]+(.*?).(jpg|jpeg|png|gif|svg\+xml|JPG|JPEG|SVG|svg|PNG|GIF)$/
  );

  const video = useRef<HTMLVideoElement | null>(null);

  const fetcher: Fetcher<Follower[]> = async (url: string) => {
    try {
      const res = await fetch(
        "https://ephraim-iyanda.onrender.com/user/post/allPosts"
      );
      const sortedData = await res.json();
      console.log(sortedData);
      return sortedData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data: sortedData, error: followersError, isLoading: isLoadingFollowers } =
    useSWR<Follower[]>("http://localhost:5000/users/0", fetcher, {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateIfStale: true,
    });

  const handlePrevPost = (followerId: string, currentDate: string) => {
    setCurrentPostIndexes((prevState) => {
      const currentIndex = prevState[followerId]?.[currentDate] || 0;
      const updatedIndexes: CurrentPostIndexes = {
        ...prevState,
        [followerId]: {
          ...prevState[followerId],
          [currentDate]: Math.max(currentIndex - 1, 0),
        },
      };
      return updatedIndexes;
    });
  };

  const handleNextPost = (followerId: string, currentDate: string) => {
    const follower =
      sortedData && sortedData.find((follower) => follower._id === followerId);
    if (follower) {
      setCurrentPostIndexes((prevState) => {
        const currentIndex = prevState[followerId]?.[currentDate] || 0;
        const updatedIndexes: CurrentPostIndexes = {
          ...prevState,
          [followerId]: {
            ...prevState[followerId],
            [currentDate]: Math.min(
              currentIndex + 1,
              follower.posts.length - 1
            ),
          },
        };
        return updatedIndexes;
      });
    }
  };

  const handleLike = (postId: string) => {
    // Implement your like functionality here
    // You may want to use a state management library like Redux or a custom hook
  };

  return (
    <div className="home max-w-[600px] overflow-y-auto flex flex-col gap-5 h-[89vh] ml-auto mr-auto md:pl-2 md:pr-2 pt-1 pb-14">
      {sortedData &&
        sortedData.map((follower: Follower, index: number) => {
          const { _id, name, posts, avatar } = follower;

          const currentPostIndexesForFollower = currentPostIndexes[_id] || {};
          const groupedPosts: { [date: string]: typeof posts } = {};

          posts.forEach((post) => {
            const postDate = new Date(post.dateJoined).toLocaleDateString();
            if (groupedPosts.hasOwnProperty(postDate)) {
              groupedPosts[postDate].push(post);
            } else {
              groupedPosts[postDate] = [post];
            }
          });

          return Object.entries(groupedPosts).map(([date, posts]) => {
            let currentPostIndex = currentPostIndexesForFollower[date] || 0;
            const isPrevPostDisabled = currentPostIndex === 0;
            const isNextPostDisabled = currentPostIndex === posts.length - 1;

            return (
              <section
                key={`${_id}-${date}`}
                className="pl-3 pr-3 pt-3 rounded-lg bg-white w-full m-auto box-shadow"
              >
                {/* ... rest of your component */}
              </section>
            );
          });
        })}
    </div>
  );
}
