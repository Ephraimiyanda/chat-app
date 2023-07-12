// MyApp.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { AppContext } from '../public/context/AppContext';
import Navbar from '@/app/ui/Navbar';
import SideNavbar from '@/app/ui/sidebar';
import { AppProps } from 'next/app';
import "../src/app/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const isAccessPage = router.pathname === '/Access';

  useEffect(() => {
    const userCookie = Cookies.get('user');
    const userData = userCookie ? JSON.parse(userCookie) : null;

    setUser(userData); 

    if (!userData && !isAccessPage) {
      router.push('/Access', undefined, { shallow: true });
    }
  }, [isAccessPage, router]);

  if (isAccessPage) {
    return <Component {...pageProps} />;
  }

  if (!user) {
    return null; 
  }

  return (
    <AppContext.Provider value={{ user }}>
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
