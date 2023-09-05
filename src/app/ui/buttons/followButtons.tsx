import { useState} from "react";
import Cookies from "js-cookie";
interface followerUiProp{
    following:boolean
   _id:string|number;
}
export default function FollowUnfollowBtn({following,_id}:followerUiProp){
        const userCookie = Cookies.get('user');
        const userData = userCookie && JSON.parse(userCookie) ;
        const[isFollowing,setIsFollowing]=useState(following)
      const followUser =async()=>{
    const follow={
         followerId :userData._id,
         userId :_id 
    }
        try{
            const res = await fetch(`https://ephraim-iyanda.onrender.com/user/follow/${_id}/${userData._id}`,
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
    const unFollowUser =async()=>{
        const follow={
             followerId :userData._id,
             userId :_id 
        }
            try{
                const res = await fetch(`https://ephraim-iyanda.onrender.com/user/unfollow/${_id}/${userData._id}`,
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
            <>
            {isFollowing? <button className=" px-2 py-1 bg-blue-600 text-white rounded-sm" onClick={()=>{
                followUser();
                setIsFollowing(false);
               }}>follow</button>: <button className="rounded-sm px-2 py-1 bg-white text-black border-[1px] " onClick={()=>{
                unFollowUser();
                setIsFollowing(true);
               }}>following</button>}
               </>
        )
}