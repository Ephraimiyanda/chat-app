import Image from "next/image"
import ProfilePic from "../../src/app/ui/images/profile-pic.png"
export default function Profile(){
    return(
        <div className="w-full pt-6">
            <div className="w-fit ml-auto mr-auto flex flex-col gap-4 ">
            <Image
                className=" w-40 h-40 rounded-[200px]  ml-auto mr-auto"
                src={ProfilePic}
                alt="profile pic"
                />
                <h2  className="text-center">Clark kent</h2>
            </div>
            <div className="flex">
                
                <Image
                                className=" w-40 h-40 rounded-[200px]  ml-auto mr-auto"
                                src={ProfilePic}
                                alt="profile pic"
                />
                                <Image
                                className=" w-40 h-40 rounded-[200px]  ml-auto mr-auto"
                                src={ProfilePic}
                                alt="profile pic"
                />
                                <Image
                                className=" w-40 h-40 rounded-[200px]  ml-auto mr-auto"
                                src={ProfilePic}
                                alt="profile pic"
                />
                                <Image
                                className=" w-40 h-40 rounded-[200px]  ml-auto mr-auto"
                                src={ProfilePic}
                                alt="profile pic"
                />
            </div>
        </div>
    )
}