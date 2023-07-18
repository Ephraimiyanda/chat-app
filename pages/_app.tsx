// MyApp.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { AppContext } from '../public/context/AppContext';
import Navbar from '@/app/ui/Navbar';
import SideNavbar from '@/app/ui/sidebar';
import { AppProps } from 'next/app';
import "../src/app/globals.css";
interface User {
  id: number; 
}
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, setUser] = useState <User|null> (null);
  const isAccessPage = router.pathname === '/Access';

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
    <AppContext.Provider value={{ user ,setUser}}>
      <div className='fixed w-full'>
        <Navbar />
        <div className="main-content flex">
          <SideNavbar />
          <div className="page-content w-full h-screen">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default MyApp;
