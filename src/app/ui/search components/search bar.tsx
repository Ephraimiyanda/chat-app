import Image from "next/image"
import bb from "../images/Union.png"

export default function SearchBar(){
    return(
        <div className="searchbar flex gap-1   h-10  rounded-3xl  border-none pl-2 bg-body xl:w-[606px] w-[95%]  ml-0 ">
            <Image
            className="h-6 mb-auto   mt-2 pt-1 "
            src={bb}
            alt="search"
            width={20}
            height={10}
            />
            <input className=" w-[80%] bg-body focus:outline-none" placeholder="search for creators,inspirations,projects..." type="text" />
        </div>
    )
}