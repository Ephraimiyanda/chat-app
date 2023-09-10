import SearchBar from "./search components/search bar";
import Image from "next/image";
import add from "./images/add.png";
import video from "./images/videocall.png";
import ProfilePic from "./images/profile-pic.png";
import Icon from "./images/81910ddd-d139-4abc-89a6-a71f64701a26.svg";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../../../public/context/AppContext";
import Link from "next/link";
import Cookies from "js-cookie";
import {
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";



export default function Navbar() {
  const { setShowCreatePost, showCreatePost } = useContext(AppContext);
  const user = JSON.parse(Cookies.get("user") as string);
  const router = useRouter();
  const handleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };
  const Logout = () => {
    Cookies.remove("user");
    router.push("/Access/");
  };
  return (
    <div
      className="flex align-middle sm:pt-2 bg-white pb-2 pl-3 pr-3 ml-auto top-0 bottom-0 border-b border-b-stone-300 sm:h-fit h-[55px] pt-[4px]"
    >
      <Link href="/">
        <Image
          className="mr-auto block sm:h-auto h-[50px]"
          src={Icon}
          alt="herosocial"
          width={60}
          height={20}
        />
      </Link>
      <div className="flex max-w-[75rem] w-full m-auto gap-[10%]">
        <h1 className="hidden xl:block text-3xl font-bold pt-3">Herosocial</h1>
        <div className="flex-1 ml-1 sm:block hidden pt-[10px]">
          <SearchBar />
        </div>
        <div className="flex gap-3 ml-auto py-1">
          <Link href="/?createpost=true" className="h-fit m-auto">
            <button className="nav-button">
              <Image
                className="ml-auto mr-auto"
                src={add}
                alt="add"
                width={20}
                height={20}
              />
            </button>
          </Link>
          <button className="nav-button">
            <Image
              className="ml-auto mr-auto w-[20px] h-4"
              src={video}
              alt="video"
            />
          </button>

          <Dropdown placement="bottom-end" className="bg-white">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform align-middle w-10 h-10 border-blue-200"
                color="primary"
                name="Jason Hughes"
                size="sm"
                src={user.avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="Bookmarks">Bookmarks</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={Logout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
