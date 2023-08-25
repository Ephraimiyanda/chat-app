import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { AppContext } from "../../../public/context/AppContext";
import { useContext } from "react";
import useFetch from "../../../public/fetch/userfetch";

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
  const { avatar, name } = follower || {};
  const socket = io("https://ephraim-iyanda.onrender.com");

  useEffect(() => {
    fetchFollower();
    fetchMessages();

    // Clean up the socket event listener when component unmounts
    return () => {
      socket.off(`sender-${userData._id}`);
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const messageJson = await fetch(
        `https://ephraim-iyanda.onrender.com/user/messages/${userData._id}/64d90b7cf1cefce483e79244`
      );
      const message = await messageJson.json();

      // Save messages as a cookie
      Cookies.set(
        `userMessages-64d90b7cf1cefce483e79244`,
        JSON.stringify(message)
      );

      // Clear the existing userMessages before adding new messages
      setUserMessages([]);

      // Add new messages from cookies to the userMessages state
      const cookieMessages = Cookies.get(
        `userMessages-64d90b7cf1cefce483e79244`
      );
     
      if (cookieMessages) {
        const gotMessage = JSON.parse(cookieMessages);
        if (gotMessage.messages) {
          const updatedMessages = gotMessage.messages.map((message: MessageProps) => ({
            content: message.content,
            timestamp: message.timestamp,
            fromSelf: userData._id === message.sender,
          }));
          setUserMessages(updatedMessages);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFollower = async () => {
    try {
      const res = await fetch(
        `https://ephraim-iyanda.onrender.com/user/64cfcd0aa7d7451982ca8445`
      );
      const validRes = await res.json();
      if (validRes?.user) {
        setFollower(validRes.user);
      }
    } catch (error) {
      console.log("Error fetching follower data:", error);
    }
  };

  const sendMessage = () => {
    const messageData = {
      senderId: userData._id,
      receiverId: "64d90b7cf1cefce483e79244",
      content: inputValue,
    };

    try {
      // Update userMessages with the sent message
      setUserMessages((prevMessages: any) => [
        ...prevMessages,
        {
          content: inputValue,
          timestamp: new Date().toISOString(),
          fromSelf: true,
        },
      ]);

      // Emit the message to the server
      socket.emit("sendMessage", messageData);

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

        <p className="text-lg">{name}</p>
      </div>
      <div className="h-[75.3vh] sm:h-[78vh] overflow-y-auto block ">
        <div className="px-2">
          {userMessages.map((message: MessageProps, index: number) => (
            <div
              key={index}
              className={`p-1 pl-2 pr-2 rounded-lg mt-2 w-fit flex flex-col max-w-[50%] sm:max-w-[200px] h-fit ${
                message.fromSelf ? "bg-green-300 ml-auto" : "bg-red-300"
              }`}
            >
              {" "}
              <p className=" overflow-auto break-words"> {message.content} </p>
              <span className="w-full text-right text-[9px]">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
      <form
        className="message-input w-full border-t items-center border-stone-300 fixed bottom-[0] flex"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          type="text"
          className="w-full px-4 py-2"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <button
          type="submit"
          className="bg-black text-white w-10 p-1 rounded h-10 right-[20px] sticky"
        >
          →
        </button>
      </form>
    </div>
  );
}

export default Message;
