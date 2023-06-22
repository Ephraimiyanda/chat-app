import Image from "next/image"
import Link from "next/link"
import ProfilePic from "../../src/app/ui/images/profile-pic.png"
export default function Profile(){
    return(
       <div className=" bg-white h-screen">
         <div className="w-[70%] pt-6 ml-auto mr-auto border-b border-b-stone-300">
            <div className="w-fit ml-auto mr-auto flex flex-col gap-4 ">
                <div className="flex ">
                    <Image
                    className=" w-40 h-40 rounded-[200px]  ml-auto mr-auto"
                    src={ProfilePic}
                    alt="profile pic"
                    />
                    <Link className=" text-black" href={""}><button className="bg-[#F3F4F6] w-28 h-12 absolute -ml-8 rounded-lg">Edit profile</button></Link>
                </div>
                <h2  className="text-center">Clark kent</h2>
                <div className="flex gap-4">
                    <p><span className=" font-semibold">1 </span>post</p>
                    <p><span className=" font-semibold">23</span> followers</p>
                    <p><span className=" font-semibold">34</span> following</p>
                </div>
            </div>
           
        </div>
       </div>
    )
}