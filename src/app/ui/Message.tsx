import React from 'react';
import { useContext,useState,useEffect } from 'react';
import { AppContext } from '../../../public/context/AppContext';

interface MessagesProps {
  contactId: string;
}
interface Follower {
  name: string;
  id: string;
  avatar:string;
}
function Message({ contactId }: MessagesProps) {
  const{user}=useContext(AppContext);
  const [followers, setFollowers] = useState<Follower[]>([]);

  useEffect(() => {
    if (user && user.followers) {
      Promise.all(
        user.followers.map((follower: Follower) =>
          fetch(`http://localhost:5000/users/${follower.id}`)
            .then(response => response.json())
        )
      )
        .then((followerData: Follower[]) => {
          setFollowers(prevFollowers => [...prevFollowers, ...followerData]);
        })
        .catch(error => console.log(error));
    }
  }, [user]);

  const messages = [
    { id: 1, sender: 'John', content: 'Hello' },
    { id: 2, sender: 'Me', content: 'Hi' },
    { id: 3, sender: 'John', content: 'How are you?' },
  ];

  const filteredMessages = messages.filter((message) => message.sender === 'Me');

  return (
    <div className='flex flex-col h-full'>
      <div className=''>
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
      <div className=" message-input  w-full border-t bortder-stone-300">
        <input type="text" className=" w-full px-4 py-2" />
      </div>
    </div>
  );
}

export default Message;
