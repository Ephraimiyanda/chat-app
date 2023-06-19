import Image from "next/image";
import ProfilePic from "./images/profile-pic.png";
import SearchBar from "./search components/search bar";
import Link from "next/link";
export default function Messages(){
    return(
        <div className="h-high p-2 pt-1 bg-white rounded-2xl flex flex-col ">
            <div className="flex justify-between mt-5 mb-5">
                <h2 className="font-bold text-xl">Messages</h2>
                <button className="text-light_grey">See all</button>
            </div>
            <div><SearchBar/></div>
            <div className=" flex justify-between text-sm font-bold border-b border-b-slate-200 mt-4 mb-3 ">
                <p className="border-b-2 border-b-white hover:border-b-2 hover:border-b-black cursor-pointer" >Primary</p>
                <p className="border-b-2  border-b-white hover:border-b-2 hover:border-b-black cursor-pointer">General</p>
                <p className="border-b-2  border-b-white text-pink-500  hover:border-b-2 hover:border-b-pink-500 cursor-pointer">Request (2)</p>
            </div>

            <div className="flex flex-col gap-2">


            <div className="flex justify-between">
            <div className="flex gap-2">
                <Image
                className="profile-pic"
                src={ProfilePic}
                alt="picture"
                />
                <div>
                <h2 className=" font-semibold text-sm ">Clark kent</h2>
                <div className="flex">  <p className="activity-time-text  ">About 20min ago </p></div>
                </div>
            </div>
            </div>

            <div className="flex justify-between">
            <div className="flex gap-2">
                <Image
                className="profile-pic"
                src={ProfilePic}
                alt="pictuer"
                />
                <div>
                <h2 className=" font-semibold text-sm ">Clark kent</h2>
                <div className="flex">  <p className="activity-time-text  ">About 20min ago </p></div>
                </div>
            </div>
            </div>

            <div className="flex justify-between">
            <div className="flex gap-2">
                <Image
                className="profile-pic"
                src={ProfilePic}
                alt="pictuer"
                />
                <div>
                <h2 className=" font-semibold text-sm ">Clark kent</h2>
                <div className="flex">  <p className="activity-time-text  ">About 20min ago </p></div>
                </div>
            </div>
            </div>


            <div className="flex justify-between">
            <div className="flex gap-2">
                <Image
                className="profile-pic"
                src={ProfilePic}
                alt="pictuer"
                />
                <div>
                <h2 className=" font-semibold text-sm ">Clark kent</h2>
                <div className="flex">  <p className="activity-time-text  ">About 20min ago </p></div>
                </div>
            </div>
            </div>
           </div>
        </div>
    )
}