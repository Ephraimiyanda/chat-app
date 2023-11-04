import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { AppContext } from "../../../public/context/AppContext";
import { useContext, useRef } from "react";
import sendArrow from "./images/forward-message-arrow-right-svgrepo-com.svg";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import {BsArrowDownCircleFill} from "react-icons/bs"
interface UserProps {
  avatar: string;
  name: string;
  _id: number;
}

interface MessageProps {
  content: string;
  fromSelf: boolean;
  timestamp: string;
  sender: string;
}

interface ContactIdProps {
  contactId: number;
}

function Message({ contactId }: ContactIdProps) {
  const [follower, setFollower] = useState<UserProps | null>(null);
  const [inputValue, setInputValue] = useState("");
  const { userMessages, setUserMessages } = useContext(AppContext); // New state for sent messages
  const userData = JSON.parse(Cookies.get("user") as string);
  const { avatar, name, _id } = follower || {};
  const socket = io("https://ephraim-iyanda.onrender.com");
  const messageContainerRef = useRef(null);
  const scrollButtonRef = useRef<any>(null);
  const messageContainer = document.querySelector(".message_container");

  const isAtBottom = useRef(true);

  useEffect(() => {
    fetchFollower();
    fetchMessagesFromAPI(); // Fetch messages from the API initially
  }, [contactId]);

  useEffect(() => {
    messageContainer?.scroll({
      top: messageContainer.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
    if (!isAtBottom.current) {
      scrollButtonRef.current.style.display = "block";
    } else {
      scrollButtonRef.current.style.display = "none";
    }
    // Add a scroll event listener to handle the button visibility
    messageContainer?.addEventListener("scroll", handleScroll);

    return () => {
      messageContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [contactId]);

  useEffect(() => {
    if (!isAtBottom.current) {
      scrollButtonRef.current.style.display = "block";
    } else {
      scrollButtonRef.current.style.display = "none";
    }

    // Scroll to the bottom when new messages arrive
    if (isAtBottom.current) {
      messageContainer?.scroll({
        top: messageContainer.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    scrollButtonRef.current.style.display = "none";
  }, [userMessages]);

  const scrollToBottom = () => {
    messageContainer?.scroll({
      top: messageContainer.scrollHeight,
      left: 0,
      behavior: "smooth",
    });

    scrollButtonRef.current.style.display = "none";
    isAtBottom.current = true;
  };

  const handleScroll = () => {
    if (messageContainer) {
      const isAtBottomValue =
        messageContainer.scrollTop + messageContainer.clientHeight ===
        messageContainer.scrollHeight;

      if (isAtBottomValue) {
        scrollButtonRef.current.style.display = "none";
      } else {
        scrollButtonRef.current.style.display = "block";
      }

      isAtBottom.current = isAtBottomValue;
    }
  };

  const fetchFollower = async () => {
    try {
      const res = await fetch(
        `https://ephraim-iyanda.onrender.com/user/${contactId}`
      );
      const validRes = await res.json();
      if (validRes?.user) {
        setFollower(validRes.user);
      }
    } catch (error) {
      console.log("Error fetching follower data:", error);
    }
  };

  const fetchMessagesFromAPI = async () => {
    try {
      const messageJson = await fetch(
        `https://ephraim-iyanda.onrender.com/user/messages/${userData._id}/${contactId}`
      );
      const message = await messageJson.json();

      // Save messages as a cookie
      Cookies.set(
        `userMessages-${contactId}`,
        JSON.stringify(message)
      );

      // Update userMessages state from the fetched messages
      const updatedMessages = message.messages.map((msg: MessageProps) => ({
        content: msg.content,
        timestamp: msg.timestamp,
        fromSelf: userData._id === msg.sender,
      }));
      setUserMessages(updatedMessages);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = () => {
    const messageData = {
      senderId: userData._id,
      receiverId: `${contactId}`,
      content: inputValue,
    };

    try {
      // Emit the message to the server
      socket.emit("sendMessage", messageData);

      // Update userMessages with the sent message
      const newMessage = {
        content: inputValue,
        timestamp: new Date().toISOString(),
        fromSelf: true,
      };
      setUserMessages((prevMessages: any) => [...prevMessages, newMessage]);

      // Update the userMessages cookie
      const updatedMessages = [...userMessages, newMessage];
      Cookies.set(
        `userMessages-${contactId}`,
        JSON.stringify({ messages: updatedMessages })
      );

      // Clear the input value
      setInputValue("");
    } catch (error) {
      console.log("An error occurred while sending the message:", error);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex align-middle items-center gap-2 py-1 px-2 border-b border-b-stone-300">
        {avatar && (
          <Image
            className="rounded-[50%] w-[54px] h-[54px]"
            src={avatar}
            alt="avatar"
            width={100}
            height={100}
            priority
          />
        )}
        <Link href={`/Accounts/${_id}`}>
          <p className="text-lg">{name}</p>
        </Link>
      </div>
      <div className="overflow-y-auto block pb-12 px-2 h-[109.5vh]">
        <div className="message_container pb-12 sm:h-full h-[75.5vh] overflow-y-auto">
          {userMessages?userMessages.map((message: MessageProps, index: number) => (
            <div
              key={index}
              className={`p-1 px-2 rounded-lg mt-2 w-fit flex flex-col max-w-[50%] sm:max-w-[200px] h-fit ${
                message.fromSelf ? "bg-green-300 ml-auto" : "bg-red-300"
              }`}
            >
              <p className="overflow-auto break-words">{message.content}</p>
              <span className="w-full text-right text-[9px]">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          )):<div className="w-full flex flex-col justify-center items-center h-full"><p>you have no messages</p></div>}
        </div>
        <div
          className="w-8 h-8 p-1 rounded-[50%] text-xl fixed  min-w-[unset] shadow sm:bottom-[70px] bottom-[50px] right-10 z-[70] cursor-pointer"
          onClick={scrollToBottom}
          ref={scrollButtonRef}
        >
          <BsArrowDownCircleFill size={30}/>
        </div>
      </div>
      <form
        className=" border-stone-300 bg-white py-2 px-1 gap-2 z-[3]  sm:sticky fixed bottom-[52px]  sm:bottom-[75px] w-full flex"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          type="text"
          className="w-full px-4 py-2 rounded-[18px]"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <button
          type="submit"
          className=" text-white w-10 p-1 h-10  sticky rounded-[40%] "
        >
          <Image
            src={sendArrow}
            className="w-1[100px]"
            alt="send"
            width={100}
            height={100}
          />
        </button>
      </form>
    </div>
  );
}

export default Message;
