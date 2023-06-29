import Image from "next/image"
import Link from "next/link";

interface ContactPropProps{
    contactAvatar:string;
    conatctId:string;
    contactName:string;
}
export default function ContactProps({contactAvatar,conatctId,contactName}:ContactPropProps){
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
        <h2 className=" font-semibold text-sm "><Link href={`/chat/${conatctId}`}>{contactName}</Link></h2>
        <div className="flex">  <p className="activity-time-text  ">About 20min ago </p></div>
        </div>
    </div>
    )
}