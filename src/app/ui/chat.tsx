import React, { useState } from 'react';
import Contacts from './contacts';
import Message from './Message';

function Chat() {
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const handleContactSelect = (contactId: string) => {
    setSelectedContact(contactId);
    window.history.pushState({}, '', `/chat/${contactId}`);
  };

  return (
    <div className="chat-container ml-auto flex  h-screen w-full h-89">
      <div className="contacts-container bg-white flex flex-col w-96  border-r border-r-stone-300 pl-1 pr-1 ml-16">
       <div className='sticky top-[0] h-32 w-full border-b border-b-stone-300 pl-2 pr-1'>
       <h2 className=' text-[40px]'>Chats</h2>
        <input className=' rounded-xl h-8' type="text" placeholder='search for message or content..' />
       </div>
        <Contacts onContactSelect={handleContactSelect} />
      </div>
      <div className="messages-container bg-blue-300 w-full overflow-x-hidden">
        {selectedContact ? (
          <Message contactId={selectedContact} />
        ) : (
          <p>Select a contact to start chatting</p>
        )}
      </div>
    </div>
  );
}

export default Chat;
