import React, { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import useSWR, { mutate } from 'swr';

// Interface declarations for TypeScript
interface ContactIdProps {
  contactId: number;
}

interface MessageProps {
  id: string | null;
  sender: number;
  receiver: number | string;
  content: string;
  timestamp: string;
}

interface UserProps {
  avatar: string ;
  name: string;
  id: number;
}

function Message({ contactId }: ContactIdProps) {
  // State to hold user information
  const [follower, setFollower] = useState<UserProps | null>(null);
  const [inputValue,setInputValue]=useState("");
  const [userMessage,setUserMessages]=useState<any>([]);
  // Get user data from Cookies
  const userData = JSON.parse(Cookies.get('user') as string);
  const { avatar, name, id: userId } = follower || {};
  const socket=io("https://ephraim-iyanda.onrender.com");


  // Fetch user data using SWR
 
  useEffect(() => {
    socket.on('messageResponse', (data) => setUserMessages([...userMessage, data]));
  }, [socket, userMessage]);

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

  // Send a message
  const sendMessage = async (messageContent: string) => {
  const messageData = {
        senderId: userData._id, // Make sure this matches your user schema
        receiverId: '64cfcd0aa7d7451982ca8445', // Replace with actual receiver ID
        content: messageContent,
      };
    try {
      setUserMessages([...userMessage, messageContent])
      socket.emit('sendMessage', messageData);
     
    } catch (error) {
      console.log('An error occurred while sending the message:', error);
    }
  };

  // Sort and display messages
  const sortedMessages = userMessage?.messages
    ?.filter(
      (message: MessageProps) =>
        (message.sender === Number(contactId) && message.receiver === Number(userId)) ||
        (message.receiver === Number(contactId) && message.sender === Number(userId))
    )
    ?.sort((a: MessageProps, b: MessageProps) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeA - timeB;
    });

  return (
    <div className="flex flex-col h-full">
      {/* Display user and avatar */}
      <div className="flex align-middle items-center gap-2 py-1 px-2 border-b border-b-stone-300">
       {  avatar&&(
          <Image
            className="rounded-[50%] w-[54px] h-[54px]"
            src={avatar}
            alt="avatar"
            width={100}
            height={100}
            priority
          />)}
      
        <p className="text-lg">{name}</p>
      </div>
      {/* Display messages */}
      <div className="h-[75.3vh] sm:h-[78vh] overflow-y-auto block">
        {userMessage}
      </div>
      {/* Message input */}
      <form className="message-input w-full border-t items-center border-stone-300 fixed bottom-[0] flex" 
      onSubmit={(e)=>{
        e.preventDefault()
        sendMessage(inputValue);
        setInputValue("")
      }}>
        <input
          type="text"
          className="w-full px-4 py-2"
          value={inputValue}
          onChange={(e)=>{setInputValue(e.target.value)}}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage(inputValue);
              e.currentTarget.value = '';
              setInputValue("");
            }
          }}
        />
        <button type='submit' className=' bg-black text-white w-10 p-1 rounded h-10 right-[20px] sticky'>→</button>
      </form>
    </div>
  );
}

export default Message;
