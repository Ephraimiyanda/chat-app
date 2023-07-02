import SearchBar from "./search components/search bar"
import Image from "next/image"
import add from "./images/add.png"
import video from "./images/videocall.png"
import ProfilePic from "./images/profile-pic.png"
import Icon from "./images/81910ddd-d139-4abc-89a6-a71f64701a26.svg"
export default function Navbar(){
    return(
        <div className=" grid grid-cols-11 align-middle sm:pt-4 bg-white pb-4  pl-3 pr-3 ml-auto top-0  bottom-0 border-b border-b-stone-300 sm:h-fit h-[55px] pt-[4px]">
            <Image
                  className="  mr-auto xl:hidden block sm:col-span-1 col-start-1 col-span-2 sm:h-auto h-[50px]"
                src={Icon}
                alt="herosocial"
                width={60}
                height={20}
                />
          <h1 className="hidden xl:block text-3xl font-bold xl:col-span-2 xl:col-start-2 md:col-start-1  ">Herosocial</h1>
            <div className="  xl:col-span-5 xl:col-start-4 md:col-start-2  md:col-span-7 md:w-[92%] md:ml-0 md:row-start-1 pt-3 xl:pt-0 search-div ml-auto mr-auto col-span-7 col-start-2 sm:block hidden xl:ml-[25px] xl:w-[89%]"><SearchBar/></div>
           <div className="flex gap-3   ml-auto xl:col-span-2 xl:col-start-9 col-start-9 pr-3 col-span-3">
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