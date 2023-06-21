import React from 'react';

interface MessagesProps {
  contactId: string;
}

function Message({ contactId }: MessagesProps) {
  const messages = [
    { id: 1, sender: 'John', content: 'Hello' },
    { id: 2, sender: 'Me', content: 'Hi' },
    { id: 3, sender: 'John', content: 'How are you?' },
  ];

  const filteredMessages = messages.filter((message) => message.sender === 'Me');

  return (
    <div className='flex flex-col h-full'>
      <div className='h-[90%]'>
        <h2>Messages</h2>
          {filteredMessages.length === 0 ? (
          <p>No messages</p>
          ) : (
          <ul>
            {filteredMessages.map((message) => (
            <li key={message.id}>
              <p>{message.content}</p>
            </li>
            ))}
          </ul>
         )}
      </div>
      <div className=" message-input  w-full h-[10%]">
        <input type="text" className=" w-full px-4 py-2" />
      </div>
    </div>
  );
}

export default Message;
