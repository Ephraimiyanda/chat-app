import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';

interface ContactIdProps {
  contactId: Number|string|any;
}

interface MessagesProps {
  sender: number;
  receiver: number;
  id: string;
  content: string;
  timestamp: string;
  contactId: number;
}
interface Userprops{
  avatar:string;
  name:string;
  
}
function Message({ contactId }: ContactIdProps) {
  const[userMessage,setuserMessage]=useState<any>();
  const[follower,setfollower]=useState<Userprops |any>("");
  const userData=JSON.parse(Cookies.get("user") as string);
  const{avatar,name}=follower
  const fetchUser=async()=>{
  try{
  const res =await fetch(`http://localhost:5000/messages/0`);
  const validres=await res.json()
  if(validres){
    setuserMessage(validres)
  }
  }catch(error){
    console.log(error);
  }
}

const fetchFollower=async()=>{
  try{
  const res =await fetch(`http://localhost:5000/users/${contactId}`);
  const validres=await res.json()
  if(validres){
    setfollower(validres)
  }
  }catch(error){
    console.log(error);
  }
}
  useEffect(()=>{
    fetchUser();
    fetchFollower()
  },[])


  const filteredMessages = userMessage && userMessage.messages.filter(
    (message: MessagesProps) =>
      (message.sender === Number(contactId) && message.receiver === Number(userMessage.id)) ||
      (message.receiver === Number(contactId) && message.sender === Number(userMessage.id))
  );

  const sortedMessages = filteredMessages?.sort(
    (a: MessagesProps, b: MessagesProps) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeA - timeB; 
    }
  );

  return (
    <div className="flex flex-col h-full  ">
      <div className='flex align-middle items-center gap-2 py-1 px-2 border-b border-b-stone-300'>
        <Image
        className=' rounded-[50%] w-[54px] h-[54px]'
        src={avatar}
        alt="avatar"
        width={100}
        height={100}
        priority
        />
        <p className=' text-lg'>{name}</p>
        </div>
      <div className='h-[75.3vh] overflow-y-auto block'>
        {sortedMessages && sortedMessages.length === 0 ? (
          <p>No messages</p>
        ) : (
          <ul className='pl-3 pr-3 '>
            {sortedMessages?.map((message: MessagesProps) => (
              <li key={message.id} className={`p-1 pl-2 pr-2 rounded-lg mt-2 w-fit flex ${
                message.sender === userMessage.id ? 'bg-green-300 ml-auto' : 'bg-red-300'
              }`}>
                <p>
                  {message.content}
                 
                </p>
                <span className=' text-xs ml-auto mt-auto pl-3'>{new Date(message.timestamp).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLocaleLowerCase()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="message-input w-full border-t border-stone-300 fixed bottom-[0]">
        <input type="text" className="w-full px-4 py-2" />
      </div>
    </div>
  );
}

export default Message;