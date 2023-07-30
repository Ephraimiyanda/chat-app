"use client";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../public/context/AppContext";
import share from "./images/share.png";
import comment from "./images/comment.png";
import like from "./images/like.png";
import bookmark from "./images/bookmark.png";
import ContactProps from "./contactProps";
import Loader from "./loader";
import useFetch from "../../../public/fetch/userfetch";
import useSWR from "swr";
import { Fetcher, mutate } from "swr/_internal";
import { useSWRConfig } from "swr/_internal";
import VideoPlayer from "./videoPlayer";
interface Follower {
  followers: any;
  timestamp: string | number | Date;
  sortedData: object;
  name: string;
  id: string;
  avatar: string;
  posts: {
    id: string;
    content: string;
    timestamp: string;
    text: string;
  }[];
}

interface CurrentPostIndexes {
  [followerId: string]: { [currentDate: string]: number };
}

export default function Stories() {
  const [activeFollowerIndex, setActiveFollowerIndex] = useState(-1);
  const [currentPostIndexes, setCurrentPostIndexes] = useState<CurrentPostIndexes>({});
  const [activePostIndex, setActivePostIndex] = useState(0);
  const regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);
  //const imageLoader=({src,quality})=>{
  //return `${src}?q=${quality || 75}`
  //}

  const fetcher: Fetcher<Follower[]> = async (url: string) => {
    const response = await fetch(url);
    const user = await response.json();
    if (user && user.followers) {
      const followerData = await Promise.all(
        user.followers.map((follower: Follower) =>
          fetch(`http://localhost:5000/users/${follower.id}`).then((response) =>
            response.json()
          )
        )
      );
      const sortedData = followerData.sort((a, b) => {
        const timeA = new Date(a.posts[0].timestamp).getTime();
        const timeB = new Date(b.posts[0].timestamp).getTime();
        return timeA - timeB;
      });
      return sortedData;
    }
    return [];
  };

  const {
    data: sortedData,
    error: followersError,
    isLoading: isLoadingFollowers,
    mutate,
  } = useSWR<Follower[]>("http://localhost:5000/users/0", fetcher, {
    refreshInterval: 1000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
  });

  if (isLoadingFollowers) {
    return <Loader />;
  }

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
      sortedData && sortedData.find((follower) => follower.id === followerId);
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

  return (
    <div className="home max-w-[600px] overflow-y-auto flex flex-col gap-5 h-[89vh] ml-auto mr-auto md:pl-2 md:pr-2 pt-1 pb-14">
      {sortedData &&
        sortedData.map((follower: Follower, index: number) => {
          const { id, name, posts, avatar } = follower;
          const sortedPosts = posts.sort((a, b) => {
            const timeA = new Date(a.timestamp).getTime();
            const timeB = new Date(b.timestamp).getTime();
            return timeA - timeB;
          });

          const handleMouseEnter = () => {
            setActiveFollowerIndex(index);
          };

          const handleMouseLeave = () => {
            setActiveFollowerIndex(-1);
          };

          const currentPostIndexesForFollower = currentPostIndexes[id] || {};
          const groupedPosts: { [date: string]: typeof sortedPosts } = {};

          sortedPosts.forEach((post) => {
            const postDate = new Date(post.timestamp).toLocaleDateString();
            if (groupedPosts.hasOwnProperty(postDate)) {
              groupedPosts[postDate].push(post);
            } else {
              groupedPosts[postDate] = [post];
            }
          });

          return Object.entries(groupedPosts).map(([date, posts]) => {
            const currentPostIndex = currentPostIndexesForFollower[date] || 0;
            const isPrevPostDisabled = currentPostIndex === 0;
            const isNextPostDisabled = currentPostIndex === posts.length - 1;

            return (
              <section
                key={`${id}-${date}`}
                className="pl-3 pr-3 pt-3 rounded-lg bg-white w-full m-auto box-shadow"
              >
                <div className=" pb-2 ">
                  <ContactProps
                    contactAvatar={avatar}
                    contactName={name}
                    contactText={`About ${new Date(
                      posts[currentPostIndex].timestamp
                    )
                      .toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })
                      .toLocaleLowerCase()} on ${date} (${posts.length} post${
                      posts.length > 1 ? "s" : ""
                    })`}
                  />
                  <p className="pt-1 pb-1 max-w-[550px] border-b border-b-stone-300">
                    {posts[currentPostIndex]?.text}
                  </p>
                </div>
                {posts.length > 0 && (
                  <div className="relative rounded-lg">
                    <button
                      onClick={() => handlePrevPost(id, date)}
                      disabled={isPrevPostDisabled}
                      className={`absolute top-[45%]  sm:left-4 transform -translate-y-[70%] p-2 text-[30px] bg-black bg-opacity-60 text-white rounded-full z-[3] ${
                        isPrevPostDisabled && "hidden"
                      }`}
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => handleNextPost(id, date)}
                      disabled={isNextPostDisabled}
                      className={`absolute top-[45%]  right-0 sm:right-4 transform -translate-y-[70%] p-2 text-[30px] bg-black bg-opacity-60 text-white rounded-full z-[3] ${
                        isNextPostDisabled && "hidden"
                      }`}
                    >
                      ›
                    </button>

                    <div className="flex justify-center mt-2 absolute top-[82%] bottom-[10%] left-[0] right-[0]  transform -translate-y-[70%]  ">
                      {posts.length > 1 &&
                        posts.map((post, index) => (
                          <div
                            key={index}
                            className={` w-2 h-2 rounded-full mx-1 cursor-pointer ${
                              currentPostIndex === index
                                ? "bg-white transition duration-500"
                                : "bg-stone-400 opacity-90 "
                            }`}
                            onClick={() => setActivePostIndex(index)}
                          />
                        ))}
                    </div>
                   <div className="  h-[350px]">
                   {!regex.test(
                      posts[currentPostIndex]?.content
                    ) ? (
                      <VideoPlayer src={posts[currentPostIndex]?.content} />
                    ) : (
                      <Image
                        //  loader={imageLoader}
                        src={posts[currentPostIndex]?.content}
                        className="rounded-lg  sm:h-[350px] h-full w-full"
                        alt="story picture"
                        width={550}
                        height={100}
                      />
                    )}
                   </div>
                    <div className=" bottom-0 left-0 w-full  pt-3 pb-3 flex items-center justify-between">
                      <div className="flex gap-4 flex-row-reverse">
                        <button>
                          <Image src={share} alt="Share" width={20} />
                        </button>
                        <button>
                          <Image src={comment} alt="Comment" width={20} />
                        </button>
                        <button>
                          <Image src={like} alt="Like" width={20} />
                        </button>
                      </div>
                      <button>
                        <Image src={bookmark} alt="Bookmark" width={20} />
                      </button>
                    </div>
                  </div>
                )}
              </section>
            );
          });
        })}
    </div>
  );
}
