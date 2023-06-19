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
    <div className="chat-container w-full ml-auto flex relative">
      <div className="contacts-container">
        <Contacts onContactSelect={handleContactSelect} />
      </div>
      <div className="messages-container">
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
