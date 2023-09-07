import SearchBar from "./search components/search bar";
import Image from "next/image";
import add from "./images/add.png";
import video from "./images/videocall.png";
import ProfilePic from "./images/profile-pic.png";
import Icon from "./images/81910ddd-d139-4abc-89a6-a71f64701a26.svg";
import { useContext, useState } from "react";
import { AppContext } from "../../../public/context/AppContext";
import Link from "next/link";
import Cookies from "js-cookie";
export default function Navbar() {
  const{setShowCreatePost,showCreatePost}=useContext(AppContext);
  
  const user= JSON.parse(Cookies.get("user") as string)

  const handleShowCreatePost=()=>{
    setShowCreatePost(!showCreatePost)
  }

  return (
    <div className="flex align-middle sm:pt-2 bg-white pb-2 pl-3 pr-3 ml-auto top-0 bottom-0 border-b border-b-stone-300 sm:h-fit h-[55px] pt-[4px]">
<Link href="/">
<Image
        className="mr-auto block sm:h-auto h-[50px]"
        src={Icon}
        alt="herosocial"
        width={60}
        height={20}
      /></Link>
      <div className="flex max-w-[75rem] w-full m-auto gap-[10%]">
        <h1 className="hidden xl:block text-3xl font-bold pt-3">
          Herosocial
        </h1>
        <div className="flex-1 ml-1 sm:block hidden pt-[10px]">
          <SearchBar />
        </div>
        <div className="flex gap-3 ml-auto">
<Link href="/?createpost=true" className="h-fit m-auto">
<button className="nav-button" >
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
          <button className="w-12">
            
            <Image
              className="w-12 h-12 rounded-3xl"
              src={user.avatar}
              alt="profile pic"
              width={100}
              height={100}
            />
            
          </button>
        </div>
      </div>
    </div>
  );
}
