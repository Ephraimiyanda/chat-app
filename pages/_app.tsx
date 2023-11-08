import React, { useEffect, useRef, useState } from "react";
import { NextRouter, useRouter } from "next/router";
import Cookies from "js-cookie";
import { AppContext } from "../public/context/AppContext";
import Navbar from "@/app/ui/Navbar";
import SideNavbar from "@/app/ui/sidebar";
import CreatePost from "./createpost";
import { Modal } from "react-aria-components";
import io from "socket.io-client";
import { NextUIProvider } from "@nextui-org/react";
import "../src/app/globals.css";
import { SCROLL_POSITION_KEY } from "../public/constants/constants";
import { useRestorePosition } from "../public/hooks/scrollHook";
import SearchModal from "@/app/ui/search components/searchModal";
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
  timestamp: string;
}

function MyApp({ Component, pageProps }: props) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [userMessages, setUserMessages] = useState<MessageProps[]>([]);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showSearchbar,setShowSearchbar]=useState(false)
  const router: NextRouter = useRouter();
  const userCookie = Cookies.get("user");
  const userData = userCookie ? JSON.parse(userCookie) : null;
  const socket = io("https://ephraim-iyanda.onrender.com");
  const positions = React.useRef<{ [key: string]: number }>({});
  const isAccessPage = router.pathname === "/Access";
  const showCreatePost =router.query?.createpost;
  const [followerArray, setFollowerArray] =useState<string[]>([])

  const fetchFollowers = async () => {
   try {
     const res = await fetch(
       `https://ephraim-iyanda.onrender.com/user/followers/${userData._id}`
     );
     const followerRes = await res.json();
     setFollowerArray(followerRes.followers); // Set the follower IDs to the followerArray state
   } catch (error) {
     console.error(error);
   }
 };

  useEffect(() => {
    fetchFollowers();

    // Check if the screen size is smaller than 768px (small screen)
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize(); // Set the initial screen size

    // Listen for resize events to update the screen size state
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up the resize event listener when the component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    socket.on(`receive-${userData?._id}`, (data: any) => {
      setUserMessages((prevMessages) => [
        ...prevMessages,
        { content: data.content, timestamp: data.timestamp, fromSelf: false },
      ]);
    });
  }, []);

  useEffect(() => {
    if (!user && userData) {
      setUser(userData);
    } else if (!userData && !router.pathname.includes("/Access")) {
      router.push("/Access", undefined, { shallow: true });
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
      <AppContext.Provider
        value={{ user, setUser, showCreatePost, userMessages, setUserMessages,showSearchbar,setShowSearchbar ,followerArray}}
      >
        <div className="fixed w-full">
          <Navbar />
          <div className="main-content fixed w-full flex">
            <div className="z-[10]">
              <SideNavbar />
            </div>
            <div
              className="page-content w-full m-auto h-screen"
            >
              {showCreatePost && <Modal
              isOpen>
              <CreatePost />
            </Modal>}
            <SearchModal/>
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </AppContext.Provider>
    </NextUIProvider>
  );
}

export default MyApp;
