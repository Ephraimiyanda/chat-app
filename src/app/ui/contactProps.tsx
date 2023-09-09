import Image from "next/image"
import Link from "next/link";

interface ContactPropProps{
    contactAvatar:string;
    contactName:string;
    contactText:string;
    _id:string|number;
}
export default function ContactProps({contactAvatar,contactName,contactText,_id}:ContactPropProps){
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
       <Link href={`/Accounts/${_id}`}> <h2 className=" font-semibold  ">{contactName}</h2></Link>
        <div className="flex">  <p className="activity-time-text  ">{contactText} </p></div>
        </div>
    </div>
    )
}