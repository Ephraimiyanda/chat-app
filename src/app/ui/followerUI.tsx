import Image from "next/image"
import Cookies from "js-cookie"
import { useState } from "react"
import Link from "next/link"
import FollowUnfollowBtn from "./buttons/followButtons"
interface followerUiProp{
    src:string
    name:string
    following:boolean
   _id:string|number;
}



export default function FollowerUi({src,name,following,_id}:followerUiProp){
    return(
        <div
         className="flex flex-col gap-1 align-middle  text-center bg-white py-2 px-[20px] rounded-md ">
            <Image
            className=" rounded-[50%]"
            src={src}
            alt="a user"
            width={100}
            height={100}
            />
           <Link href={`/Accounts/${_id}`}> <h4 className=" whitespace-nowrap overflow-hidden overflow-ellipsis w-[80px] h-[30px] max-w-[100px] text-center">{name}</h4></Link>
          <FollowUnfollowBtn following={following} _id={_id}/>
        </div>
    )
}