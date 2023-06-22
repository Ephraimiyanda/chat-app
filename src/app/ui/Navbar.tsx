import SearchBar from "./search components/search bar"
import Image from "next/image"
import add from "./images/add.png"
import video from "./images/videocall.png"
import ProfilePic from "./images/profile-pic.png"
import Icon from "./images/icon.svg"
export default function Navbar(){
    return(
        <div className=" grid grid-cols-11 align-middle pt-4 bg-white pb-4  pl-3 pr-3 ml-auto top-0  bottom-0 border-b border-b-stone-300 ">
            <Image
                  className=" ml-auto mr-auto"
                src={Icon}
                alt="herosocial"
                width={20}
                height={20}
                />
          <h1 className=" text-3xl font-bold xl:col-span-2 xl:col-start-2 md:col-start-1  ">Herosocial</h1>
            <div className="  xl:col-span-5 xl:col-start-4 md:col-start-3 col-span-7 md:col-span-5 md:row-start-1 row-start-2  search-div ml-auto mr-auto"><SearchBar/></div>
           <div className="flex gap-3   ml-auto xl:col-span-2  col-start-9 pr-3 col-span-3">
           <button className="nav-button" >
                <Image
                  className=" ml-auto mr-auto"
                src={add}
                alt="add"
                width={20}
                height={20}
                />
            </button>
            <button className="nav-button">
                <Image
                className=" ml-auto mr-auto"
                src={video}
                alt="video"
                width={20}
                height={20}
                />
            </button>
            <button className=" w-12 ">
                <Image
                className=" w-12 h-12 rounded-3xl  "
                src={ProfilePic}
                alt="profile pic"
                />
            </button>
           </div>
        </div>
    )
}