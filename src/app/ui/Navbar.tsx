import SearchBar from "./search components/search bar"
import Image from "next/image"
import add from "./images/add.png"
import video from "./images/videocall.png"
import ProfilePic from "./images/profile-pic.png"
export default function Navbar(){
    return(
        <div className=" flex justify-center align-middle pt-4 bg-white pb-4 mb-3 pl-3 pr-3 ">
          <h1 className=" text-3xl font-bold">Herosocial</h1>
            <SearchBar/>
           <div className="flex gap-4 w-48 pr-0">
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
            <button className=" w-12">
                <Image
                className=" w-12 h-12 rounded-3xl "
                src={ProfilePic}
                alt="profile pic"
                />
            </button>
           </div>
        </div>
    )
}