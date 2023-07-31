'use client'
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import MessageIcon from "./images/message-three-points-1560-svgrepo-com.svg"
import ProfileIcon from "./images/profile-round-1342-svgrepo-com.svg"
import VideoIcon from "./images/play-square-svgrepo-com.svg"
import Home from "./images/ikea-home-smart-svgrepo-com.svg"
import SettingsIcon from "./images/settings-svgrepo-com.svg"
import NotificationIcon from "./images/notification-bing-svgrepo-com.svg"
import Explore from "./images/search-left-1506-svgrepo-com.svg"
import HomeActive from "./images/home-active.svg"
import UserActive from "./images/userActive.svg"
import MessageActive from "./images/MessageActive.svg"
import { useRouter } from 'next/router';

interface NavItemProps {
  link:string;
  imgSrc:ImageProps;
}

const NavItem: React.FC<NavItemProps> = ({imgSrc, link }) => {
  return (
   <Link href={link}>
    <li className="flex items-center h-8">
      <Image
        width={27}
        height={27}
        {...imgSrc}
        className="mr-auto ml-auto"
        alt='sidebar elements'
      />
    </li>
   </Link>
  );
};

const SideNavbar = () => {
  const router =useRouter()
  return (
    <div
      className=" bg-white  p-4 w-fit overflow-y-hidden h-full overflow-hidden sidebar pt-16 border-r border-b-stone-300 " >
      <ul className="flex flex-col sm:gap-8 gap-[6%]">
        <NavItem {...router.pathname==="/"?{imgSrc: { src: HomeActive,alt:"home" }}:{imgSrc: { src: Home,alt:"home" }}} link='/'  />
        <NavItem {...router.pathname==="/profile"?{imgSrc: { src:UserActive,alt:"profile" }}:{imgSrc: { src: ProfileIcon,alt:"profile" }}}  link="/profile"  />
        <NavItem {...router.pathname==="/chat"?{imgSrc: { src:MessageActive,alt:"chat" }}:{imgSrc: { src: MessageIcon,alt:"chat" }}} link="/chat" />
        <NavItem imgSrc={{src:VideoIcon,alt:"media"}}  link=""  />
        <NavItem imgSrc={{src:Explore,alt:"explore"}}  link=""  />
        <NavItem imgSrc={{src:NotificationIcon,alt:"notifications"}}  link=""  />
        <NavItem imgSrc={{src:SettingsIcon,alt:"settings"}}  link=""  />
      </ul>
    </div>
  );
};

export default SideNavbar;
