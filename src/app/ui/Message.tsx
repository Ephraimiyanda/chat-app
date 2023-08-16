import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import io from 'socket.io-client';

interface ContactIdProps {
  contactId: number;
}

interface UserProps {
  avatar: string;
  name: string;
  _id: number;
}

function Message({ contactId }: ContactIdProps) {
  const [follower, setFollower] = useState<UserProps | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [userMessages, setUserMessages] = useState<any[]>([]);
  const userData = JSON.parse(Cookies.get('user') as string);
  const { avatar, name, _id } = follower || {};
  const socket = io("https://ephraim-iyanda.onrender.com");

  useEffect(() => {
    fetchFollower();
  }, []);

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

  useEffect(() => {
    socket.on(`receiver-64c822dd49065021d3a30e4f`, (data: any) => {
      setUserMessages((prevMessages) => [...prevMessages, { content: data.content, fromSelf: true }]);
    });
  }, [socket, userData]);

  const sendMessage = (messageContent: string) => {
    const messageData = {
      senderId: userData._id,
      receiverId: "64c822dd49065021d3a30e4f", // Replace with actual receiver ID
      content: messageContent,
    };

    try {
      setUserMessages((prevMessages) => [...prevMessages, { content: messageContent, fromSelf: true }]);
      socket.emit('sendMessage', messageData);
    } catch (error) {
      console.log('An error occurred while sending the message:', error);
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
      <div className="h-[75.3vh] sm:h-[78vh] overflow-y-auto block">
        {userMessages.map((message, index) => (
          <div
            key={index}
            className={`p-1 pl-2 pr-2 rounded-lg mt-2 w-fit ${message.fromSelf ? 'bg-green-300 ml-auto' : 'bg-red-300'
              }`}
          >
            <p>{message.content}</p>
          </div>
        ))}
      </div>
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
