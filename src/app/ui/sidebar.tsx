"use client";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import MessageIcon from "./images/message-three-points-1560-svgrepo-com.svg";
import ProfileIcon from "./images/profile-round-1342-svgrepo-com.svg";
import VideoIcon from "./images/play-square-svgrepo-com.svg";
import Home from "./images/ikea-home-smart-svgrepo-com.svg";
import SettingsIcon from "./images/settings-svgrepo-com.svg";
import NotificationIcon from "./images/notification-bing-svgrepo-com.svg";
import Explore from "./images/search-left-1506-svgrepo-com.svg";
import HomeActive from "./images/home-active.svg";
import UserActive from "./images/userActive.svg";
import MessageActive from "./images/MessageActive.svg";
import { useRouter } from "next/router";
import videojs from "video.js";
import { SCROLL_POSITION_KEY } from "../../../public/constants/constants";
import { useContext } from "react";
import { AppContext } from "../../../public/context/AppContext";

interface NavItemProps {
  link: string;
  imgSrc: ImageProps;
}

const NavItem: React.FC<NavItemProps> = ({ imgSrc, link }) => {
  const router = useRouter();

  const savePostion = () => {
    const page_content = document.querySelector(".homepage");
    if (router.pathname === "/") {
      sessionStorage.setItem(
        SCROLL_POSITION_KEY,
        String(page_content?.scrollTop)
      );
      console.log(sessionStorage);
    }
  };

  return (
    <Link prefetch onClick={savePostion} scroll={false} href={link}>
      <li className="flex items-center h-8">
        <Image
          width={27}
          height={27}
          {...imgSrc}
          className="mr-auto ml-auto  max-w-[unset]"
          alt="sidebar elements"
        />
      </li>
    </Link>
  );
};

const SideNavbar = () => {
  const router = useRouter();
  const { showSearchbar, setShowSearchbar } = useContext(AppContext);
  const savePostion = () => {
    const page_content = document.querySelector(".homepage");
    if (router.pathname === "/") {
      sessionStorage.setItem(
        SCROLL_POSITION_KEY,
        String(page_content?.scrollTop)
      );
      console.log(sessionStorage);
    }
  };

  return (
    <div className=" bg-white  p-4  overflow-y-hidden h-full overflow-hidden sidebar pt-16 border-r border-b-stone-300 z-10 w-[60px] ">
      <ul className="flex flex-col sm:gap-8 gap-[6%]">
        <NavItem
          {...(router.pathname === "/"
            ? { imgSrc: { src: HomeActive, alt: "home" } }
            : { imgSrc: { src: Home, alt: "home" } })}
          link="/"
        />
        <NavItem
          {...(router.pathname === "/profile"
            ? { imgSrc: { src: UserActive, alt: "profile" } }
            : { imgSrc: { src: ProfileIcon, alt: "profile" } })}
          link="/profile"
        />
        <NavItem
          {...(router.pathname.includes("/chat")
            ? { imgSrc: { src: MessageActive, alt: "chat" } }
            : { imgSrc: { src: MessageIcon, alt: "chat" } })}
          link="/chat"
        />
        <div
        className="cursor-pointer"
          onClick={() => {
            setShowSearchbar(true);
            savePostion();
          }}
        >
          <li className="flex items-center h-8">
            <Image
              width={27}
              height={27}
              src={Explore}
              alt="explore"
              className="mr-auto ml-auto  max-w-[unset]"
            />
          </li>
        </div>
        <NavItem
          imgSrc={{ src: NotificationIcon, alt: "notifications" }}
          link=""
        />
        <NavItem imgSrc={{ src: SettingsIcon, alt: "settings" }} link="" />
      </ul>
    </div>
  );
};

export default SideNavbar;
