import Image from "next/image"
import Link from "next/link";

interface ContactPropProps{
    contactAvatar:string;
    contactName:string;
    contactText:string;
}
export default function ContactProps({contactAvatar,contactName,contactText}:ContactPropProps){
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
        <h2 className=" font-semibold text-sm ">{contactName}</h2>
        <div className="flex">  <p className="activity-time-text  ">{contactText} </p></div>
        </div>
    </div>
    )
}