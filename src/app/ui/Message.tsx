import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import io from 'socket.io-client';

interface UserProps {
  avatar: string;
  name: string;
  _id: number;
}

interface MessageProps {
  content: string;
  fromSelf: boolean;
  timestamp:string
}

interface ContactIdProps {
  contactId: number;
}

function Message({ contactId }: ContactIdProps) {
  const [follower, setFollower] = useState<UserProps | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [userMessages, setUserMessages] = useState<MessageProps[]>([]);
  const [sentMessages, setSentMessages] = useState<MessageProps[]>([]); // New state for sent messages
  const userData = JSON.parse(Cookies.get('user') as string);
  const { avatar, name } = follower || {};
  const socket = io("https://ephraim-iyanda.onrender.com");

  useEffect(() => {
    fetchFollower();
  }, []);

  const fetchFollower = async () => {
    try {
      const res = await fetch(`https://ephraim-iyanda.onrender.com/user/${contactId}`);
      const validRes = await res.json();
      if (validRes?.user) {
        setFollower(validRes.user);
      }
    } catch (error) {
      console.log('Error fetching follower data:', error);
    }
  };

  useEffect(() => {

    socket.on(`sender-${userData._id}`,  (data: any) => {
      setUserMessages(prevMessages => [...prevMessages, { content: data.content,timestamp:data.timestamp, fromSelf: true }]);
    });

  }, [socket, userData]);

useEffect(()=>{

  socket.on(`receive-${userData._id}`,(data: any) => {
    setUserMessages(prevMessages => [...prevMessages, { content: data.content,timestamp:data.timestamp, fromSelf: false }]);
  });
},[])

  const sendMessage = () => {
    const messageData = {
      senderId: userData._id,
      receiverId: contactId, 
      content: inputValue,
    };
//64c822dd49065021d3a30e4f
    try {
      socket.emit('sendMessage', messageData);
      setInputValue('');
    } catch (error) {
      console.log('An error occurred while sending the message:', error);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
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
        <div className='px-2'>
        {userMessages.concat(sentMessages).map((message, index) => (
          
            <div 
             key={index}
             className={`p-1 pl-2 pr-2 rounded-lg mt-2 w-fit flex flex-col max-w-[50%] sm:max-w-[200px] h-fit ${
               message.fromSelf ? 'bg-green-300 ml-auto' : 'bg-red-300'
             }`}> <p className=' overflow-auto break-words'> {message.content} </p>
             <span className=' text-[9px]'>{new Date(
              message.timestamp
            )
              .toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}</span></div>
          
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
