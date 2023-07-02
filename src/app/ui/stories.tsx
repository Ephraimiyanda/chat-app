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

export default function Stories() {
  const { user } = useContext(AppContext);
  const [sortedFollowers, setSortedFollowers] = useState<Follower[]>([]);
  const [currentPostIndexes, setCurrentPostIndexes] = useState<{
    [followerId: string]: number;
  }>({});
  const [activeFollowerIndex, setActiveFollowerIndex] = useState(0);

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

  const handleNextPost = (followerId: string) => {
    setCurrentPostIndexes((prevIndexes) => ({
      ...prevIndexes,
      [followerId]: (prevIndexes[followerId] || 0) + 1,
    }));
  };

  const handlePrevPost = (followerId: string) => {
    setCurrentPostIndexes((prevIndexes) => ({
      ...prevIndexes,
      [followerId]: (prevIndexes[followerId] || 0) - 1,
    }));
  };

  if (!sortedFollowers || sortedFollowers.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home overflow-y-auto flex flex-col gap-5 h-[89vh] ml-auto mr-auto md:pl-2 md:pr-2 lg:pl-0 pb-14">
      {sortedFollowers.map((follower: Follower, index) => {
        const { id, name, posts, avatar } = follower;
        const currentPostIndex = currentPostIndexes[id] || 0;
        const sortedPosts = posts.sort((a, b) => {
          const timeA = new Date(a.timestamp).getTime();
          const timeB = new Date(b.timestamp).getTime();
          return timeA - timeB;
        });
        const isFirstPost = currentPostIndex === 0;
        const isLastPost = currentPostIndex === sortedPosts.length - 1;

        return (
          <section
            key={id}
            className="pl-3 pr-3 pt-3 rounded-lg bg-white w-full relative"
          >
              <div className="pb-2">
                  <ContactProps
                    contactAvatar={avatar}
                    contactName={name}
                    contactText={`About ${new Date(
                      sortedPosts[currentPostIndex].timestamp
                    ).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    }).toLocaleLowerCase()} ${
                      new Date(sortedPosts[currentPostIndex].timestamp).toLocaleDateString() ===
                      new Date().toLocaleDateString()
                        ? "today"
                        : `on ${new Date(sortedPosts[currentPostIndex].timestamp).toLocaleDateString()}`
                    }`}
                  />
                </div>
            <div
              className="story-picture rounded-lg relative"
              onMouseEnter={() => setActiveFollowerIndex(index)}
              onMouseLeave={() => setActiveFollowerIndex(-1)}
            >
              <Image
                src={sortedPosts[currentPostIndex].content}
                className=" rounded-lg"
                alt="story picture"
                width={550}
                height={360}
              />
              <div className="flex w-fit m-auto -mt-5 ">
                {sortedPosts.length>1?sortedPosts.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 mx-1 rounded-full ${
                      index === currentPostIndex ? "bg-white" : "bg-stone-300"
                    }`}
                  ></div>
                )):<div className="mt-2"></div>}
              </div>
              {activeFollowerIndex === index && (
                <>
                  {!isFirstPost && (
                    <button
                      onClick={() => handlePrevPost(id)}
                      className="p-2 absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full z-10"
                    >
                      ‹
                    </button>
                  )}
                  {!isLastPost && (
                    <button
                      onClick={() => handleNextPost(id)}
                      className="p-2 absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full z-10"
                    >
                      ›
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex gap-2 ">
                <button className="p-2">
                  <Image className="w-5" src={like} alt="like" />
                </button>

                <button className="p-2">
                  <Image className="w-5" src={comment} alt="comment" />
                </button>

                <button className="p-2">
                  <Image className="w-5" src={share} alt="share" />
                </button>
              </div>
              <button className="p-2">
                <Image className="w-4" src={bookmark} alt="bookmark" />
              </button>
            </div>
            <div>{sortedPosts[currentPostIndex].text}</div>

            <div className="flex justify-center mt-2  bottom-4 w-full"></div>
          </section>
        );
      })}
    </div>
  );
}
