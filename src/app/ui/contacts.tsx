"use client"
import React, { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { AppContext } from "../../../public/context/AppContext";
import ContactProps from "@/app/ui/contactProps";
import useFetch from "../../../public/fetch/userfetch";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
interface chatProps {
  name: string;
  _id:any;
  avatar: string;
  user: any;
}

interface loaderprop {
  src: string;
}

function Contacts() {
  const [chats, setChats] = useState<chatProps[]>([]);
  const router = useRouter()
  const contactId=router.query;
  const userCookie = Cookies.get("user");
  const userData = userCookie && JSON.parse(userCookie);
  const { user } = useFetch(
    `https://ephraim-iyanda.onrender.com/user/followers/${userData._id}`
  );
 


  useEffect(() => {
    // Check if the user and its followers exist
    if (user && user.followers && user.followers.length > 0) {
      // Fetch information about each follower
      Promise.all(
        user.followers.map((followerId: string) => {
          return fetch(`https://ephraim-iyanda.onrender.com/user/${followerId}`,{ cache: 'force-cache' })
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
    <div className="contact-container h-[100svh] overflow-auto pb-16">
      <ul className="flex flex-col gap-2 pb-10 h-[100svh] overflow-auto pb-10">
        {chats.map((chat, index) => (
          <Link
            href={`/chat/${chat._id}`}
            key={chat._id}
            className={`contacts hover:bg-stone-200 pl-3 pr-1 pt-1 pb-1 ${
              contactId ===chat._id ? "bg-stone-200" : ""
            }`}
          >
                <div className="flex gap-2">
                  <Image
                    className="profile-pic"
                    src={chat.avatar}
                    alt="picture"
                    width={27}
                    height={27}
                  />
                  <div>
                    <h2 className=" font-semibold  ">{chat.name}</h2>
                    <div className="flex">
                      {" "}
                      <p className="activity-time-text font-semibold ">
                        you might have a new message{" "}
                      </p>
                    </div>
                  </div>
                </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
