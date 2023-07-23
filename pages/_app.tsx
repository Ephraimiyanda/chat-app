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
import CreatePost from '@/app/ui/createPost';
interface User {
  id: number; 
}
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, setUser] = useState <User|null> (null);
  const isAccessPage = router.pathname === '/Access';
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [showCreatePost,setShowCreatePost]=useState(false);


  useEffect(() => {
    setTimeout(()=>{
    const handleRouteChange = (url: any, { shallow }:any) => {
      setIsLoaderVisible(true);
    };

    const handleRouteComplete = (url:any, { shallow }:any) => {
      setIsLoaderVisible(false);
    };

// here we subscribe to router change start and complete events
    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);

// unsubscribing to router events when component unmounts to prevent memeory leaks
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  })
  }, []);

 

  useEffect(() => {
    const userCookie = Cookies.get('user');
    const userData = userCookie ? JSON.parse(userCookie) : null;

    if (!user && userData) {
      setUser(userData);
    } else if (!userData && !isAccessPage) {
      router.push('/Access', undefined, { shallow: true });
    }
  }, [user]);
  

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
    <AppContext.Provider value={{ user ,setUser,setShowCreatePost}}>
      <div className='fixed w-full'>
        <Navbar />
        <div className="main-content flex">
          <SideNavbar />
          <div className="page-content w-full h-screen">
            {showCreatePost?<CreatePost/>:null}
            {
              isLoaderVisible ?<Loader/>:<Component {...pageProps} />
            }
             
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default MyApp;
