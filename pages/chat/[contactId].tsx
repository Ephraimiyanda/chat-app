

import React, { useContext ,useState,useEffect} from 'react';
import useFetch from '../../public/fetch/userfetch';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MessageIcon from "../../src/app/ui/images/message-three-points-1560-svgrepo-com.svg"
import Message from '@/app/ui/Message';
import Chat from '.';
interface ContactIdProps {
  contactId: Number;
}



export default function chats() {
  const router=useRouter();
  const{contactId}=router.query
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Check if the screen size is smaller than 768px (small screen)
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize(); // Set the initial screen size

    // Listen for resize events to update the screen size state
    window.addEventListener('resize', handleResize);

    return () => {
      // Clean up the resize event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);

return(
  <div className="messages-container bg-white w-[100%] overflow-x-hidden">
  
 {! isSmallScreen ? (
    <Chat/>
    ):(
     <div>
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
    )}
    
</div>
  );
}

 


