import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { AppContext } from "../../../public/context/AppContext";
import ContactProps from "./contactProps";
import useFetch from "../../../public/fetch/userfetch";
import Cookies from "js-cookie";

interface chatProps {
  name: string;
  _id: string;
  avatar: string;
  user:any
}

interface loaderprop {
  src: string;
}

function Contacts() {
  const userCookie = Cookies.get('user');
  const userData = userCookie && JSON.parse(userCookie) ;
  const { user } = useFetch(`https://ephraim-iyanda.onrender.com/user/followers/${userData._id}`);
  const [chats, setChats] = useState<chatProps[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const handleClick = (index: number) => {
    setActiveIndex(index);
    localStorage.setItem("activeIndex", index.toString());
  };

  useEffect(() => {
    const storedIndex = localStorage.getItem("activeIndex");
    if (storedIndex) {
      setActiveIndex(parseInt(storedIndex));
    }
  }, []);

  useEffect(() => {
    // Check if the user and its followers exist
    if (user && user.followers && user.followers.length > 0) {
      // Fetch information about each follower
      Promise.all(
        user.followers.map((followerId: string) => {
          return fetch(`https://ephraim-iyanda.onrender.com/user/${followerId}`)
            .then((res) => res.json())
            .then((data: chatProps) => {
              setChats((prevChats) => [...prevChats, data.user]);
              
            })
            .catch((error) => {
              console.error("Error fetching follower data:", error);
            });
        })
      );
    }
  }, [user]);

  return (
    <div className="contact-container overflow-auto pb-16">
      <ul className="flex flex-col gap-2 pb-10">
        {chats.map((chat, index) => (
          <Link
            href={`/chat/${chat._id}`}
            key={chat._id}
            className={`contacts hover:bg-stone-200 pl-3 pr-1 pt-1 pb-1 ${
              activeIndex === index ? "bg-stone-200" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            <ContactProps
              contactAvatar={chat.avatar}
              contactText={"Might have a new message"}
              contactName={chat.name}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
