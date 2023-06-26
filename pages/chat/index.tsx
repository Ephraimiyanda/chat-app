import React from 'react';
import { useRouter } from 'next/router';
import Contacts from '@/app/ui/contacts';
import Message from '@/app/ui/Message';

function Chat() {
  const router = useRouter();
  const { contactId } = router.query;
 
  return (
    <div className="chat-container ml-auto flex h-screen w-full">
      <div className="contacts-container bg-white flex flex-col w-96 border-r border-r-stone-300 pl-1 pr-1">
        <div className="sticky top-[0] h-32 w-full border-b border-b-stone-300 pl-2 pr-1 pb-5">
          <h2 className="text-[40px]">Chats</h2>
          <input className="rounded-xl h-8 w-full" type="text" placeholder="search for message or content.." />
        </div>
        <Contacts/>
      </div>
      <div className="messages-container bg-white w-[100%] overflow-x-hidden">
        {contactId ? (
          <Message contactId={contactId as string}  />
        ) : (
          <p>Select a contact to start chatting</p>
        )}
      </div>
    </div>
  );
}

export default Chat;
