import Image from "next/image"
import Cookies from "js-cookie"
interface followerUiProp{
    src:string
    name:string
    following:boolean
   _id:string;
}



export default function FollowerUi({src,name,following,_id}:followerUiProp){
    const userCookie = Cookies.get('user');
    const userData = userCookie && JSON.parse(userCookie) ;

  const followUser =async()=>{
const follow={
     followerId :userData._id,
     userId :_id 
}
    try{
        const res = await fetch(`https://ephraim-iyanda.onrender.com/user/${_id}/${userData._id}`,
        {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(follow)
        })
    }
    catch(error){
        console.error(error);
    }
}
    return(
        <div
         className="flex flex-col gap-1 align-middle  text-center bg-white py-2 px-[20px] rounded-md">
            <Image
            className=" rounded-[50%]"
            src={src}
            alt="a user"
            width={100}
            height={100}
            />
            <h4 className=" whitespace-nowrap overflow-hidden overflow-ellipsis w-[80px] h-[120px] max-w-[100px] text-center">{name}</h4>
           {following? <button className=" px-2 py-1 bg-blue-600 text-white rounded-sm" onClick={followUser}>follow</button>: <button className="rounded-sm px-2 py-1 bg-white text-black border-[1px] ">following</button>}
        </div>
    )
}