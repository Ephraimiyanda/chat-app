import React from 'react';
import Link from "next/link";
import { useContext,useState,useEffect } from 'react';
import { AppContext } from '../../../public/context/AppContext';
import Image from 'next/image';
interface chatProps {
  name: string;
  id: string;
  avatar:string;
}


function Contacts() {


  const{user}=useContext(AppContext);
  const [chats, setChats] = useState<chatProps[]>([]);

  useEffect(() => {
    if (user && user.followers) {
      Promise.all(
        user.followers.map((chats: chatProps) =>
          fetch(`http://localhost:5000/users/${chats.id}`)
            .then(response => response.json())
        )
      )
        .then((chatsData: chatProps[]) => {
          setChats(prevChats => [...prevChats, ...chatsData]);
        })
        .catch(error => console.log(error));
    }
  }, [user]);

  return (
    <div className='h--[89] overflow-auto pl-3 pr-1 pb-16'>
      <ul className='pt-4 flex flex-col gap-2 pb-10'>
        {chats.map((chat) => (
          <Link href={`/chat/${chat.id}`} key={chat.id}> 
          <div key={chat.id} className='flex gap-2'>
          <Image
          className="profile-pic"
          src={chat.avatar}
          alt="picture"
          width={27}
          height={27}
          />
            <li className=' cursor-pointer' >
            {chat.name}
          </li>
          </div>
          </Link>
        
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
