import Image from "next/image";
import Link from "next/link";
import ProfilePic from "../../src/app/ui/images/profile-pic.png";
import { useContext } from "react";
import { AppContext } from "../../public/context/AppContext";


export default function Profile() {
  const { user } = useContext(AppContext);
   return (
    <div className=" bg-white h-screen">
      {user && (
        <div className="w-[100%] sm:w-[80%] pt-6 ml-auto mr-auto ">
          <div className="w-[90%] sm:w-[80%] ml-auto mr-auto flex flex-col gap-4 pb-[20px] ">
            <div className="flex ">
              <Image
                className=" w-40 h-40 rounded-[200px]  ml-auto mr-auto"
                src={user.avatar}
                alt="profile pic"
                width={50}
                height={50}
              />
              <Link className=" text-black" href={""}>
                <button className="bg-[#F3F4F6] w-28 h-12 absolute -ml-8 rounded-lg">
                  Edit profile
                </button>
              </Link>
            </div>
            <h2 className="text-center o">{user.name}</h2>
            <div className="flex gap-4 ml-auto mr-auto w-full flex-wrap justify-center pb-[20px] border-b border-b-stone-300 ">
              <p>
                <span className=" font-semibold">1 </span>
                <Link href={""}>post</Link>
              </p>
              <p>
                <span className=" font-semibold">23</span>{" "}
                <Link href={""}>Followers</Link>
              </p>
              <p>
                <span className=" font-semibold">34</span>{" "}
                <Link href={""}>Following</Link>{" "}
              </p>
            </div>
          </div>
          <div className="i-post  pl-1 flex flex-wrap justify-start gap-[3px]  overflow-y-auto  h-[40vh]  ml-auto mr-auto">
          {user.posts && user.posts.map((posts:any)=>(
 <Image
 className="post-contents  w-[200px]  lg:w-[200px] h-[50%]"
 src={posts.content && posts.content}
 alt="profile pic"
 width={100}
 height={100}
/>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}
