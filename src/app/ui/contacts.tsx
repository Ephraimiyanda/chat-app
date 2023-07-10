import React from "react";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../public/context/AppContext";
import Image from "next/image";
import ContactProps from "./contactProps";
interface chatProps {
  name: string;
  id: string;
  avatar: string;
}
interface loaderprop {
  src: string;
}
const imageLoader = ({ src }: loaderprop) => {
  return src;
};
function Contacts() {
  const { user } = useContext(AppContext);
  const [chats, setChats] = useState<chatProps[]>([]);

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
    <div className="h--[89] overflow-auto  pb-16">
      <ul className="pt-4 flex flex-col gap-2 pb-10">
        {chats.map((chat) => (
          <Link
            href={`/chat/${chat.id}`}
            key={chat.id}
            className=" hover:bg-stone-200 pl-3 pr-1  pt-2 pb-2"
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
