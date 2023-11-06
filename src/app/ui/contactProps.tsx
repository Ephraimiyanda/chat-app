import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/router";
import { SCROLL_POSITION_KEY } from "../../../public/constants/constants";

interface ContactPropProps{
    contactAvatar:string;
    contactName:string;
    contactText:string;
    _id:string|number;
}
export default function ContactProps({contactAvatar,contactName,contactText,_id}:ContactPropProps){
    const router =useRouter()
    const savePostion=()=>{
        const page_content=document.querySelector(".homepage")
         if(router.pathname==="/"){
            sessionStorage.setItem(SCROLL_POSITION_KEY,String(page_content?.scrollTop))
            console.log(sessionStorage);
           }
          
        }
    return(
        <div className="flex gap-2">
        <Image
        className="profile-pic"
        src={contactAvatar}
        alt="picture"
        width={27}
        height={27}
        />
        <div>
       <Link href={`/Accounts/${_id}`} onClick={savePostion}> <h2 className=" font-semibold  ">{contactName}</h2></Link>
        <div className="flex">  <p className="activity-time-text  ">{contactText} </p></div>
        </div>
    </div>
    )
}