'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import bb from "./images/addFriend.png";
import Link from 'next/link';

interface NavItemProps {
  name: string;
  isHovered: boolean;
  link:string;
}

const NavItem: React.FC<NavItemProps> = ({ name, isHovered,link }) => {
  return (
   <Link href={link}>
    <li className="flex items-center w-fit h-8">
      <Image
        src={bb}
        alt={name}
        width={24}
        height={24}
        className="mr-2"
      />
      <span
        className={`transition-all duration-700 overflow-hidden ${isHovered ? 'w-24' : 'w-0'}`}
      >
        {name}
      </span>
    </li>
   </Link>
  );
};

const SideNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`navbar bg-white p-4 w-fit absolute overflow-y-hidden h-full overflow-hidden sidebar pt-16 border-r border-b-stone-300 ${
        isHovered ? 'sidebar-hovered' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul className="flex flex-col gap-3">
        <NavItem isHovered={isHovered} link='/chat' name="Profile" />
        <NavItem isHovered={isHovered} link="" name="Settings" />
        <NavItem isHovered={isHovered} link="" name="Message" />
        {/* Add more NavItem components for additional navbar items */}
      </ul>
    </div>
  );
};

export default SideNavbar;
