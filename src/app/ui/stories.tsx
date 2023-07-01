import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../public/context/AppContext";
import baby from "./images/Jonathan_Kent_Arrow_Earth-38_0001.png";
import share from "./images/share.png";
import comment from "./images/comment.png";
import like from "./images/like.png";
import bookmark from "./images/bookmark.png";

interface Follower {
  timestamp: string | number | Date;
  name: string;
  id: string;
  avatar:string;
  posts: {
    id: string;
    content: string;
    timestamp: string;
  }[];
}

export default function Stories() {
  const { user } = useContext(AppContext);
  const [sortedFollowers, setSortedFollowers] = useState<Follower[]>([]);

  useEffect(() => {
    if (user && user.followers) {
      Promise.all(
        user.followers.map((follower: Follower) =>
          fetch(`http://localhost:5000/users/${follower.id}`)
            .then((response) => response.json())
        )
      )
        .then((followerData: Follower[]) => {
          const sortedData = followerData.sort((a, b) => {
                const timeA = new Date(a.timestamp).getTime();
                const timeB = new Date(b.timestamp).getTime();
                return timeA - timeB; 
          
          });
          setSortedFollowers(sortedData);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  return (
    <div className="home overflow-y-auto flex flex-col gap-5 h-[89vh] ml-auto mr-auto md:pl-2 md:pr-2 lg:pl-0 pb-14">
      {sortedFollowers?.map((follower: Follower) => (
        <section key={follower.id} className="pl-3 pr-3 pt-3 rounded-lg bg-white w-full">
          <div>{follower.name}</div>
          {follower.posts.map((post) => (
            <div key={post.id}>{post.content}</div>
          ))}
        </section>
      ))}
    </div>
  );
}

