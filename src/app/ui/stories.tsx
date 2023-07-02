import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../public/context/AppContext";
import baby from "./images/Jonathan_Kent_Arrow_Earth-38_0001.png";
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
    text:string;
  }[];
}

export default function Stories() {
  const { user } = useContext(AppContext);
  const [sortedFollowers, setSortedFollowers] = useState<Follower[]>([]);
  const [currentPostIndexes, setCurrentPostIndexes] = useState<{
    [followerId: string]: number;
  }>({});

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
      {sortedFollowers.map((follower: Follower) => {
        const { id, name, posts,avatar } = follower;
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
            className="pl-3 pr-3 pt-3 rounded-lg bg-white w-full"
          >
            
            {sortedPosts.map((post, index) => (
              <div
                key={post.id}
                style={{
                  display: index === currentPostIndex ? "block" : "none",
                }}
              >
                <section className="pl-1 pr-1 pt-2 rounded-lg bg-white w-full ">
                <div className="pb-2"><ContactProps contactAvatar={avatar} contactName={name} contactText={`About ${new Date(post.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLocaleLowerCase()} ${new Date(post.timestamp).toLocaleDateString()===new Date().toLocaleDateString()?"today":`on ${new Date(post.timestamp).toLocaleDateString()}`}`}/></div>
                  <Image
                    className="story-picture rounded-lg "
                    src={post.content}
                    alt="story picture"
                    width={550}
                    height={360}
                  />
                  <div className="flex justify-between mt-2">
                    <div className="flex gap-2 ">
                      <button className=" p-2">
                        <Image className="w-5" src={like} alt="like" />
                      </button>

                      <button className=" p-2">
                        <Image className="w-5" src={comment} alt="comment" />
                      </button>

                      <button className=" p-2">
                        <Image className="w-5" src={share} alt="share" />
                      </button>
                    </div>
                    <button className=" p-2">
                      <Image className="w-4" src={bookmark} alt="bookmark" />
                    </button>
                  </div>
                  <div>{post.text}</div>
                </section>
                
              </div>
            ))}

            <div>
              {!isFirstPost && (
                <button onClick={() => handlePrevPost(id)}>
                  Previous Post
                </button>
              )}
              {!isLastPost && (
                <button onClick={() => handleNextPost(id)}>Next Post</button>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
