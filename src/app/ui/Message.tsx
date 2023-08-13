import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import io from 'socket.io-client';

// Interface declarations for TypeScript
interface ContactIdProps {
  contactId: number;
}

interface UserProps {
  avatar: string;
  name: string;
  id: number;
}

function Message({ contactId }: ContactIdProps) {
  // State to hold user information
  const [follower, setFollower] = useState<UserProps | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [userMessages, setUserMessages] = useState<string[]>([]);
  // Get user data from Cookies
  const userData = JSON.parse(Cookies.get('user') as string);
  const { avatar, name, id: userId } = follower || {};
  const socket = io("https://ephraim-iyanda.onrender.com");

  // Fetch follower data when component mounts
  useEffect(() => {
    fetchFollower();
  }, []);

  // Fetch follower data
  const fetchFollower = async () => {
    try {
      const res = await fetch(`https://ephraim-iyanda.onrender.com/user/64cfcd0aa7d7451982ca8445`);
      const validRes = await res.json();
      if (validRes && validRes.user) {
        setFollower(validRes.user);
      }
    } catch (error) {
      console.log('Error fetching follower data:', error);
    }
  };

  // Receive a message
  useEffect(() => {
    socket.on(`sender-${userData._id}`, (data: any) => {
      setUserMessages(prevMessages => [...prevMessages, data.content]);
    });
  }, [socket, userData]);

  // Send a message
  const sendMessage = (messageContent: string) => {
    const messageData = {
      senderId: userData._id,
      receiverId:"64c822dd49065021d3a30e4f", // Replace with actual receiver ID
      content: messageContent,
    };

    try {
      setUserMessages(prevMessages => [...prevMessages, messageContent]);
      socket.emit('sendMessage', messageData);
    } catch (error) {
      console.log('An error occurred while sending the message:', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Display user and avatar */}
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
      {/* Display messages */}
      <div className="h-[75.3vh] sm:h-[78vh] overflow-y-auto block">
        {userMessages.map((message, index) => (
          <div
            key={index}
            className={`p-1 pl-2 pr-2 rounded-lg mt-2 w-fit ${
              userId === contactId ? 'bg-green-300 ml-auto' : 'bg-red-300'
            }`}
          >
            <p>{message}</p>
          </div>
        ))}
      </div>
      {/* Message input */}
      <form
        className="message-input w-full border-t items-center border-stone-300 fixed bottom-[0] flex"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(inputValue);
          setInputValue('');
        }}
      >
        <input
          type="text"
          className="w-full px-4 py-2"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage(inputValue);
              setInputValue('');
            }
          }}
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
