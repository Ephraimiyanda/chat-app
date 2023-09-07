import Image from "next/image"
import FollowUnfollowBtn from "../buttons/followButtons";
import { AppContext } from "../../../../public/context/AppContext";
import Link from "next/link";
import { useContext } from "react";
interface FollowerFollowingProp{
    src:string;
    name:string;
    followerNo:string;
    followingNo:string;
    postNo:string;
    _id:string;
    key:any
}

export default function FollowFollowingUi({src,name,followerNo,followingNo,postNo,_id}:FollowerFollowingProp){
    const { followerArray } = useContext(AppContext);
    return (
        <div className="flex  gap-1 align-middle items-center px-2 m-auto max-w-[380px] border-b border-stone-300 py-2">
            <Image
            src={src}
            alt="profile picture"
            className="rounded-[50%] h-[60px] w-[60px]"
            width={50}
            height={50}
            />
          <div className="flex flex-col">
          <Link href={`/Accounts/${_id}`}><h4>{name}</h4></Link> 
           <div className="flex flex-wrap gap-2">
           <p><span className="font-semibold">{followerNo}</span> <Link href={`/Accounts/followers/${_id}`}> followers</Link></p>
            <p><span className="font-semibold">{followingNo} </span> <Link href={`/Accounts/following/${_id}`}>following</Link></p>
            <p><span className="font-semibold">{postNo}</span> posts</p>
           </div>              
          </div>
               <div className="ml-auto">
               <FollowUnfollowBtn
                    following={
                      followerArray && followerArray.includes(_id)
                        ? false
                        : true
                    }
                    _id={_id}
                  />
               </div>
        </div>
    )
}