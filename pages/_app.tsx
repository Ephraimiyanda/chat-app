import React, { useEffect, useRef, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { AppContext } from '../public/context/AppContext';
import Navbar from '@/app/ui/Navbar';
import SideNavbar from '@/app/ui/sidebar';
import CreatePost from './createpost';
import { Modal } from 'react-aria-components';
import io from 'socket.io-client';
import { NextUIProvider } from '@nextui-org/react';
import "../src/app/globals.css";
interface User {
  id: number;
}

interface props {
  Component: React.ComponentType<any>;
  pageProps: Record<string, any>;
}
interface MessageProps {
  content: string;
  fromSelf: boolean;
  timestamp:string
}
function saveScrollPosition(
  url: string,
  element: HTMLElement,
  savePosition: (url: string, pos: number) => void
) {
  if (element) {
    savePosition(url, element.scrollTop);
  }
}

function restoreScrollPosition(
  url: string,
  element: HTMLElement,
  positions: React.MutableRefObject<{ [key: string]: number }>
) {
  const position = positions.current[url];

  if (position) {
    element.scrollTo({ top: position });
  }
}

function MyApp({ Component, pageProps }: props) {
  const router: NextRouter = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const userCookie = Cookies.get('user');
  const userData = userCookie ? JSON.parse(userCookie) : null;
  const socket = io('https://ephraim-iyanda.onrender.com');
  const positions = React.useRef<{ [key: string]: number }>({});
  const isAccessPage = router.pathname === '/Access';
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const showCreatePost = router.query?.createpost;
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [userMessages, setUserMessages] = useState<MessageProps[]>([]);
  const updatePosition = (url: string, pos: number) => {
    positions.current = {
      ...positions.current,
      [url]: pos,
    };
  };
  const mainRef = useRef<any>(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      let shouldScrollRestore = false;
      window.history.scrollRestoration = 'manual';

      const element = mainRef.current;

      const onBeforeUnload = (event: BeforeUnloadEvent) => {
        saveScrollPosition(router.asPath, element, updatePosition);
        delete event['returnValue'];
      };

      const onRouteChangeStart = (url: string) => {
        saveScrollPosition(url, element, updatePosition);
      };

      const onRouteChangeComplete = (url: string) => {
        if (shouldScrollRestore) {
          shouldScrollRestore = false;
          restoreScrollPosition(url, element, positions);
        }
      };

      window.addEventListener('beforeunload', onBeforeUnload);
      router.events.on('routeChangeStart', onRouteChangeStart);
      router.events.on('routeChangeComplete', onRouteChangeComplete);
      router.beforePopState(() => {
        shouldScrollRestore = true;
        return true;
      });

      return () => {
        window.removeEventListener('beforeunload', onBeforeUnload);
        router.events.off('routeChangeStart', onRouteChangeStart);
        router.events.off('routeChangeComplete', onRouteChangeComplete);
        router.beforePopState(() => true);
      };
    }
  }, [router]);

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

  useEffect(()=>{
    socket.on(`receive-${userData?._id}`,(data: any) => {
      setUserMessages(prevMessages => [...prevMessages, { content: data.content,timestamp:data.timestamp, fromSelf: false }]);
   
    });

  },[])


  useEffect(() => {
    if (!user && userData) {
      setUser(userData);
    } else if (!userData && !router.pathname.includes('/Access')) {
      router.push('/Access', undefined, { shallow: true });
    }
  }, [user, router, userData]);

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
    <NextUIProvider>
      <AppContext.Provider value={{ user, setUser, showCreatePost ,userMessages, setUserMessages}}>
        <div className="fixed w-full">
          <Navbar />
          <div className="main-content fixed w-full flex" >
            <div className="z-[10]">
              <SideNavbar />
            </div>
            <div id="main-content" className="page-content w-full m-auto h-screen" >
              <Component {...pageProps} ref={mainRef}/>
              {/* Add your Modal component here */}
            </div>
          </div>
        </div>
      </AppContext.Provider>
    </NextUIProvider>
  );
}

export default MyApp;
