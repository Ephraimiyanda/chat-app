import React, { useContext } from 'react';
import { AppContext } from '../../../public/context/AppContext';

interface MessagesProps {
  sender: Number;
  receiver:Number;
  id: string;
  content: string;
  contactId: number; 
}

function Message({contactId}:MessagesProps) { 
  const { user } = useContext(AppContext);

  const filteredMessages = user.messages.filter(
    (message: MessagesProps) =>
      (message.sender === user.id && message.receiver === contactId) ||
      (message.sender === contactId && message.receiver === user.id)
  );

  console.log(filteredMessages);

  return (
    <div className="flex flex-col h-full">
      <div>
        <h2>Messages</h2>
        {filteredMessages.length === 0 ? (
          <p>No messages</p>
        ) : (
          <ul>
            {filteredMessages.map((message: MessagesProps) => (
              <li key={message.id}>
                <p>{message.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="message-input w-full border-t border-stone-300">
        <input type="text" className="w-full px-4 py-2" />
      </div>
    </div>
  );
}

export default Message;
