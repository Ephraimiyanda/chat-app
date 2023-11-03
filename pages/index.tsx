import "../src/app/globals.css";
import SideCard from "../src/app/ui/activity";
import Stories from "../src/app/ui/stories";
import NewMessages from "../src/app/ui/newMessages";
import Cookies from "js-cookie";
import { useEffect, useState, useContext, useRef } from "react";
import FollowerUi from "@/app/ui/AccountUi/followerUI";
import { AppContext } from "../public/context/AppContext";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import useScrollPosition from "../public/hooks/scrollHook";
interface followerUiProp {
  avatar: any;
  src: string;
  name: string;
  following: boolean;
  _id: string;
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
export default function Homepage() {
  const userCookie = Cookies.get("user");
  const userData = userCookie && JSON.parse(userCookie);
  const [allUsers, setAllUsers] = useState<followerUiProp[]>([]);
  const [followers, setFollowers] =useState<string[]>([])
  const [loading, setLoading] = useState(true);
  const { followerArray,setFollowerArray } = useContext(AppContext);
  const router = useRouter();

   const fetchFollowers = async () => {
    try {
      const res = await fetch(
        `https://ephraim-iyanda.onrender.com/user/followers/${userData._id}`
      );
      const followerRes = await res.json();
      setFollowers(followerRes.followers);
      setFollowerArray(followerRes.followers)
    } catch (error) {
      console.error(error);
    }
  };
  const fetchAllusers = async () => {
    try {
      const res = await fetch(
        "https://ephraim-iyanda.onrender.com/user/allUsers"
      );
      const Users = await res.json();
      setAllUsers(Users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllusers();  
     fetchFollowers().then(() => {
      // After followers data is fetched, set loading to false
      setLoading(false);
    });
    
  }, []);
  const positions = React.useRef<{ [key: string]: number }>({});
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


  return (
    <div  className="h-full scrollbar-default ">
    <div   className="homepage  flex m-auto justify-around xl:justify-between max-w-[75rem] scrollbar-hide scroll-smooth pt-2  overflow-y-auto  h-full ">
      <aside className="col-span-2 col-start-2  overflow-y-auto hidden sm:hidden xl:grid w-[20%] pt-1 pr-1 pl-1">
        <SideCard />
      </aside>
      <main ref={mainRef} className="stories flex flex-col gap-2 home w-full max-w-[600px] pr-1 h-fit">
        <div className=" followerBar w-full overflow-y-hidden flex overflow-x-auto gap-2 pb-2  max-w-[580px] h-[180px] m-auto">
        {loading ? (
          <div className=" flex justify-center w-screen  items-center"><Spinner color="primary"/></div>
        ) : (
          <div className=" followerBar w-full overscroll-y-none flex overflow-x-auto gap-2 pb-2  max-w-[580px] h-[180px] m-auto">
            {allUsers &&
              allUsers.map((users: followerUiProp, index) => (
                <FollowerUi
                  key={index}
                  src={users.avatar}
                  name={users.name}
                  _id={users._id}
                  following={
                    followers && followers.includes(users._id)
                      ? false
                      : true
                  }
                />
              ))}
                 </div>
        )}
        </div>
        <div className="pb-20">
          <Stories />
        </div>
      </main>
      <aside className=" xl:col-span-2 activity  flex xl:w-[22%] flex-col gap-4 overflow-y-auto  pb-10 pr-1 pl-1 w-[25%] pt-1">
        <div>
          <NewMessages />
        </div>
      </aside>
    </div>
    </div>
  );
}
