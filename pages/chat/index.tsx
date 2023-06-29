import React from 'react';
import { useRouter } from 'next/router';
import Contacts from '@/app/ui/contacts';
import Message from '@/app/ui/Message';
import Image from 'next/image';
import MessageIcon from "../../src/app/ui/images/message-three-points-1560-svgrepo-com.svg"

function Chat() {
  const router = useRouter();
  const { contactId } = router.query;
 
  return (
    <div className="chat-container ml-auto flex h-screen w-full">
      <div className="contacts-container bg-white flex flex-col w-96 border-r border-r-stone-300">
        <div className="sticky top-[0] h-32 w-full border-b border-b-stone-300 pl-2 pr-1 pb-5">
          <h2 className="text-[40px]">Chats</h2>
          <input className="rounded-xl h-8 w-full" type="text" placeholder="search for message or content.." />
        </div>
        <Contacts/>
      </div>
      <div className="messages-container bg-white w-[100%] overflow-x-hidden">
        {contactId ? (
          <Message contactId={contactId as unknown as Number}/>
        ) : (
       <div className='m-auto  w-fit h-full flex-wrap flex  content-center'>
        <div className='flex flex-col -mt-24 pb-2'>
        <Image
          width={107}
          alt="message icon"
          height={27}
          src={MessageIcon}
          className="mr-auto ml-auto"
        />
          <p className='pt-2'>Select a contact to start chatting with</p>
        </div>
       </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
