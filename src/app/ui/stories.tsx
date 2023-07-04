import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../public/context/AppContext";
import share from "./images/share.png";
import comment from "./images/comment.png";
import like from "./images/like.png";
import bookmark from "./images/bookmark.png";
import ContactProps from "./contactProps";

interface Follower {
  timestamp: string | number | Date;
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
  const { user } = useContext(AppContext);
  const [sortedFollowers, setSortedFollowers] = useState<Follower[]>([]);
  const [activeFollowerIndex, setActiveFollowerIndex] = useState<number>(-1);
  const [currentPostIndexes, setCurrentPostIndexes] = useState<CurrentPostIndexes>({});

  useEffect(() => {
    if (user && user.followers) {
      Promise.all(
        user.followers.map((follower: Follower) =>
          fetch(`http://localhost:5000/users/${follower.id}`).then((response) =>
            response.json()
          )
        )
      )
        .then((followerData: Follower[]) => {
          const sortedData = followerData.sort((a, b) => {
            const timeA = new Date(a.posts[0].timestamp).getTime();
            const timeB = new Date(b.posts[0].timestamp).getTime();
            return timeA - timeB;
          });
          setSortedFollowers(sortedData);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  if (!sortedFollowers || sortedFollowers.length === 0) {
    return <div>Loading...</div>;
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
    const follower = sortedFollowers.find((follower) => follower.id === followerId);
    if (follower) {
      setCurrentPostIndexes((prevState) => {
        const currentIndex = prevState[followerId]?.[currentDate] || 0;
        const updatedIndexes: CurrentPostIndexes = {
          ...prevState,
          [followerId]: {
            ...prevState[followerId],
            [currentDate]: Math.min(currentIndex + 1, follower.posts.length - 1),
          },
        };
        return updatedIndexes;
      });
    }
  };

  return (
    <div className="home overflow-y-auto flex flex-col gap-5 h-[89vh] ml-auto mr-auto md:pl-2 md:pr-2 lg:pl-0 pb-14">
      {sortedFollowers.map((follower: Follower, index: number) => {
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
            <section key={`${id}-${date}`} className="pl-3 pr-3 pt-3 rounded-lg bg-white w-full">
              <div className="pb-2">
                <ContactProps
                  contactAvatar={avatar}
                  contactName={name}
                  contactText={`About ${new Date(posts[currentPostIndex].timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLocaleLowerCase()} ${date} (${posts.length} post${posts.length > 1 ? "s" : ""})`}
                />
              </div>
              {posts.length > 0 && (
                <div className="relative rounded-lg">
                  <button
                    onClick={() => handlePrevPost(id, date)}
                    disabled={isPrevPostDisabled}
                    className={`absolute top-[42%] sm:top-1/2 sm:left-4 transform -translate-y-[70%] p-2 text-[30px] bg-black bg-opacity-60 text-white rounded-full ${isPrevPostDisabled && "hidden"}`}
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => handleNextPost(id, date)}
                    disabled={isNextPostDisabled}
                    className={`absolute top-[42%] sm:top-1/2 right-0 sm:right-4 transform -translate-y-[70%] p-2 text-[30px] bg-black bg-opacity-60 text-white rounded-full ${isNextPostDisabled && "hidden"}`}
                  >
                    ›
                  </button>
                  <Image
                    src={posts[currentPostIndex]?.content}
                    className="rounded-lg  sm:h-[350px] h[300px]"
                    alt="story picture"
                    width={550}
                    height={360}
                  />
                  <div className=" bottom-0 left-0 w-full  p-3 flex items-center justify-between">
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
                  <p>{posts[currentPostIndex]?.text}</p>
                </div>
                
              )}
            </section>
          );
        });
      })}
    </div>
  );
}
