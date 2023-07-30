// MyApp.tsx

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { AppContext } from '../public/context/AppContext';
import Navbar from '@/app/ui/Navbar';
import SideNavbar from '@/app/ui/sidebar';
import { AppProps } from 'next/app';
import "../src/app/globals.css";
import Loader from '@/app/ui/loader';
import CreatePost from '@/app/ui/createpost';
import { Modal } from 'react-aria-components';
import { type } from 'os';
interface User {
  id: number; 
  
}
type props={
  Component:any,
   pageProps:any,
   searchParams:Record<string, string>|null|undefined
}
function MyApp({ Component, pageProps,searchParams }: props) {
  const router = useRouter();
  const [user, setUser] = useState <User|null> (null);
  const isAccessPage = router.pathname === '/Access';
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const showCreatePost=router.query?.createpost;


  useEffect(() => {
    setTimeout(()=>{
    const handleRouteChange = (url: any, { shallow }:any) => {
      setIsLoaderVisible(true);

      setTimeout(() => {
      setIsLoaderVisible(false);
    }, 2000);
  
    };

    

// here we subscribe to router change start and complete events
    router.events.on("routeChangeStart", handleRouteChange);

// unsubscribing to router events when component unmounts to prevent memeory leaks
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
   } })

  }, []);

 

  useEffect(() => {
    const userCookie = Cookies.get('user');
    const userData = userCookie ? JSON.parse(userCookie) : null;

    if (!user && userData) {
      setUser(userData);
    } else if (!userData && !isAccessPage) {
      router.push('/Access', undefined, { shallow: true });
    }
  }, [user,isAccessPage,router]);
  

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user.id) {
        try {
          const response = await fetch(`http://localhost:5000/users/${user.id}`);
          const userData = await response.json();
          setUser(prevUser => ({ ...prevUser, ...userData }));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUser();
  }, [user]);
  if (isAccessPage) {
    return (
      <AppContext.Provider value={{ user ,setUser}}>
        <Component {...pageProps} />
      </AppContext.Provider>
    );
  }

  if (!user) {
    return null; 
  }

  return (
    <AppContext.Provider value={{ user ,setUser,showCreatePost}}>
      <div className='fixed w-full'>
        <Navbar />
        <div className="main-content flex">
          <SideNavbar />
          <div className="page-content w-full h-screen ">
           <Component {...pageProps} />
            
               {showCreatePost&&<Modal
             isOpen>
              <CreatePost/>
             </Modal>}
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default MyApp;
