import Image from "next/image"
import Link from "next/link"
import ProfilePic from "../../src/app/ui/images/profile-pic.png"
export default function Profile(){
    return(
       <div className=" bg-white h-screen">
         <div className="w-[100%] sm:w-[80%] pt-6 ml-auto mr-auto ">
            <div className="w-[90%] sm:w-[80%] ml-auto mr-auto flex flex-col gap-4 pb-[20px] ">
                <div className="flex ">
                    <Image
                    className=" w-40 h-40 rounded-[200px]  ml-auto mr-auto"
                    src={ProfilePic}
                    alt="profile pic"
                    />
                    <Link className=" text-black" href={""}><button className="bg-[#F3F4F6] w-28 h-12 absolute -ml-8 rounded-lg">Edit profile</button></Link>
                </div>
                <h2  className="text-center o">Clark kent</h2>
                <div className="flex gap-4 ml-auto mr-auto w-full flex-wrap justify-center pb-[20px] border-b border-b-stone-300 ">
                    <p><span className=" font-semibold">1 </span><Link href={""}>post</Link></p>
                    <p><span className=" font-semibold">23</span> <Link href={""}>Followers</Link></p>
                    <p><span className=" font-semibold">34</span> <Link href={""}>Following</Link> </p>
                </div>
            </div>
            <div className="i-post  pr-1 pl-1 grid grid-cols-4 grid-rows-[auto] gap-[3px]  overflow-y-auto sm:h-[50vh] h-[40vh]  ">
                                <Image
                    className="  ml-auto mr-auto w-full h-full "
                    src={ProfilePic}
                    alt="profile pic"
                    />
                               <Image
                    className="  ml-auto mr-auto w-full h-full"
                    src={ProfilePic}
                    alt="profile pic"
                    />
                               <Image
                    className="  ml-auto mr-auto w-full h-full"
                    src={ProfilePic}
                    alt="profile pic"
                    />           <Image
                    className="  ml-auto mr-auto w-full h-full"
                    src={ProfilePic}
                    alt="profile pic"
                    />           <Image
                    className="  ml-auto mr-auto w-full h-full"
                    src={ProfilePic}
                    alt="profile pic"
                    />           <Image
                    className="  ml-auto mr-auto w-full h-full"
                    src={ProfilePic}
                    alt="profile pic"
                    />
                               <Image
                    className="  ml-auto mr-auto w-full h-full"
                    src={ProfilePic}
                    alt="profile pic"
                    />           <Image
                    className="  ml-auto mr-auto w-full h-full"
                    src={ProfilePic}
                    alt="profile pic"
                    />           <Image
                    className="  ml-auto mr-auto w-full h-full"
                    src={ProfilePic}
                    alt="profile pic"
                    />           <Image
                    className="  ml-auto mr-auto w-full h-full"
                    src={ProfilePic}
                    alt="profile pic"
                    />           <Image
                    className="  ml-auto mr-auto w-full h-full"
                    src={ProfilePic}
                    alt="profile pic"
                    />
           </div>
        </div> 

       
       </div>
    )
}