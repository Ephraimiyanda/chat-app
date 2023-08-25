import Image from "next/image"
interface followerUiProp{
    src:string
    name:string
    following:boolean
}
export default function FollowerUi({src,name,following}:followerUiProp){
    return(
        <div>
            <Image
            src={src}
            alt="a user"
            width={100}
            height={100}
            />
            <h4>{name}</h4>
           {following? <button className=" px-1 py-2 bg-blue-600 text-white">follow</button>: <button className="px-1 py-2 bg-white text-black border-[1px] ">following</button>}
        </div>
    )
}