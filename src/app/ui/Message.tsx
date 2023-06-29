import React, { useContext } from 'react';
import { AppContext } from '../../../public/context/AppContext';

interface ContactIdProps {
  contactId: Number;
}

interface MessagesProps {
  sender: number;
  receiver: number;
  id: string;
  content: string;
  timestamp: string;
  contactId: number;
}

function Message({ contactId }: ContactIdProps) {
  const { user } = useContext(AppContext);

  const filteredMessages = user && user.messages.filter(
    (message: MessagesProps) =>
      (message.sender === Number(contactId) && message.receiver === Number(user.id)) ||
      (message.receiver === Number(contactId) && message.sender === Number(user.id))
  );

  const sortedMessages = filteredMessages?.sort(
    (a: MessagesProps, b: MessagesProps) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return timeA - timeB; 
    }
  );

  return (
    <div className="flex flex-col h-full">
      <div>
        {sortedMessages && sortedMessages.length === 0 ? (
          <p>No messages</p>
        ) : (
          <ul className='pl-3 pr-3'>
            {sortedMessages?.map((message: MessagesProps) => (
              <li key={message.id} className={`p-1 pl-2 pr-2 rounded-lg mt-2 w-fit flex ${
                message.sender === user.id ? 'bg-green-300 ml-auto' : 'bg-red-300'
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
      <div className="message-input w-full border-t border-stone-300">
        <input type="text" className="w-full px-4 py-2" />
      </div>
    </div>
  );
}

export default Message;
