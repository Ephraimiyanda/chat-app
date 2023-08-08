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
import CreatePost from './createpost';
import { Modal } from 'react-aria-components';
interface User {
  id: number;

}

type props = {
  Component: any,
  pageProps: any,
  searchParams: Record<string, string> | null | undefined
}
function MyApp({ Component, pageProps, searchParams }: props) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const isAccessPage = router.pathname === '/Access';
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const showCreatePost = router.query?.createpost;
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




  useEffect(() => {
    const userCookie = Cookies.get('user');
    const userData = userCookie ? JSON.parse(userCookie) : null;

    if (!user && userData) {
      setUser(userData);
    } else if (!userData && !isAccessPage) {
      router.push('/Access', undefined, { shallow: true });
    }
  }, [user, isAccessPage, router]);


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
      <AppContext.Provider value={{ user, setUser }}>
        <Component {...pageProps} />
      </AppContext.Provider>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AppContext.Provider value={{ user, setUser, showCreatePost }}>
      <div className='fixed w-full'>
        <Navbar />
        <div className="main-content flex">
          <SideNavbar />
          <div className="page-content w-full h-screen ">
            <Component {...pageProps} />

            {showCreatePost && <Modal
              isOpen>
              <CreatePost />
            </Modal>}
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default MyApp;
