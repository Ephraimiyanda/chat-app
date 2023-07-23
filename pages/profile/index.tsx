import Image from "next/image";
import Link from "next/link";
import ProfilePic from "../../src/app/ui/images/profile-pic.png";
import { Key, useContext } from "react";
import { AppContext } from "../../public/context/AppContext";

export default function Profile() {
  const { user } = useContext(AppContext);
  return (
    <div className=" bg-white h-screen">
      {user && (
        <div className="w-[100%] sm:w-[80%] pt-6 ml-auto mr-auto ">
          <div className="w-[90%] sm:w-[80%] ml-auto mr-auto flex flex-col gap-4 pb-[20px] border-b border-b-stone-300 ">
            <div className="flex  gap-3 m-auto w-fit ">
              <Image
                className=" w-40 h-40 rounded-[200px]  ml-auto mr-auto"
                src={user.avatar}
                alt="profile pic"
                width={50}
                height={50}
              />
              <div className="w-[80%] flex flex-col gap-4 h-fit m-auto">
                <div className="flex">
                  <h2 className="text-center w-fit p-3">{user.name}</h2>
                  <Link className=" text-black w-fit " href={""}>
                    <button className="bg-[#F3F4F6] p-3 rounded-lg">
                      Edit profile
                    </button>
                  </Link>
                </div>
                <div className="flex gap-4 mr-auto w-fit flex-wrap justify-center pb-[20px] ">
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
            </div>
          </div>
          <div className="i-post  pl-1 flex flex-wrap justify-start gap-[3px]  overflow-y-auto  h-[40vh]  ml-auto mr-auto pt-2">
            {user.posts &&
              user.posts.map((posts: any,index: Key | null | undefined) => (
                <Image
                key={index}
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
