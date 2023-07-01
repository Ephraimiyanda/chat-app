import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../../public/context/AppContext";
import baby from "./images/Jonathan_Kent_Arrow_Earth-38_0001.png";
import share from "./images/share.png";
import comment from "./images/comment.png";
import like from "./images/like.png";
import bookmark from "./images/bookmark.png";
import Cookies from "js-cookie";

interface User {
  id: number;
  name: string;
  dateJoined: string;
  email: string;
  phoneNumber: string;
  posts: {
    id: string;
    content: string;
    timestamp: string;
  }[];
  followers: {
    id: number;
    name: string;
    posts: {
      id: string;
      content: string;
      timestamp: string;
    }[];
  }[];
  following: {
    id: number;
    name: string;
  }[];
  savedPosts: {
    id: number;
    content: string;
    timestamp: string;
  }[];
  messages: {
    id: number;
    content: string;
    sender: number;
    receiver: number;
    timestamp: string;
  }[];
}

export default function Stories() {
  const { user } = useContext(AppContext);

  if (!user || !user.followers) {
    return <div>Loading user data...</div>;
  }

  const sortedFollowers = user.followers.sort((a: any, b: any) => {
    const latestPostA = a.posts.reduce(
      (latest: string, post: { timestamp: string }) =>
        post.timestamp > latest ? post.timestamp : latest,
      ""
    );
    const latestPostB = b.posts.reduce(
      (latest: string, post: { timestamp: string }) =>
        post.timestamp > latest ? post.timestamp : latest,
      ""
    );
    return latestPostB.localeCompare(latestPostA);
  });

  return (
    <div className="home overflow-y-auto flex flex-col gap-5 h-[89vh] ml-auto mr-auto md:pl-2 md:pr-2 lg:pl-0 pb-14">
      {sortedFollowers.map((follower: any) => (
        <section key={follower.id} className="pl-3 pr-3 pt-3 rounded-lg bg-white w-full">
          <div>{follower.name}</div>
          {follower.posts.map((post: any) => (
            <div key={post.id}>
              <p>{post.content}</p>
              <p>{post.timestamp}</p>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
