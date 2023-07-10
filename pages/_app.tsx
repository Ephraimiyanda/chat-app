import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/app/ui/Navbar';
import SideNavbar from '@/app/ui/sidebar';
import "../src/app/globals.css"
import { AppContext } from '../public/context/AppContext';
import useFetch from '../public/fetch/userfetch';
import { AppProps } from 'next/app';
import Cookies from 'js-cookie';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      setUserData(userData);
    } else {
      if (router.pathname !== '/Access') {
        router.push('/Access');
      }
    }
  }, [router]);

  const isSignUpPage = router.pathname === '/Access';

  if (!user && !isSignUpPage) {
    return <Component {...pageProps} />;
  }

  return (
    <AppContext.Provider value={{ user, setUserData }}>
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
