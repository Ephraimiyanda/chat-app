import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { AppContext } from "../../../public/context/AppContext";
import ContactProps from "./contactProps";
import useFetch from "../../../public/fetch/userfetch";

interface chatProps {
  name: string;
  id: string;
  avatar: string;
}

interface loaderprop {
  src: string;
}

function Contacts() {
  const { user} = useFetch("http://localhost:5000/users/0");
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
    if (user && user.followers) {
      Promise.all(
        user.followers.map((chats: chatProps) =>
          fetch(`http://localhost:5000/users/${chats.id}`).then((response) =>
            response.json()
          )
        )
      )
        .then((chatsData: chatProps[]) => {
          setChats((prevChats) => [...prevChats, ...chatsData]);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);
              
  return (
    <div className="contact-container overflow-auto pb-16">
      <ul className=" flex flex-col gap-2 pb-10">
        {chats.map((chat, index) => (
          <Link
            href={`/chat/${chat.id}`}
            key={chat.id}
            className={`contacts hover:bg-stone-200 pl-3 pr-1 pt-1 pb-1 ${
              activeIndex === index ? "bg-stone-200" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            <ContactProps
              contactAvatar={chat.avatar}
              contactText={"About 20min ago"}
              contactName={chat.name}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
