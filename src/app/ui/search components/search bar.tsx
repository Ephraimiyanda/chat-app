import Image from "next/image"
import bb from "../images/Union.png"

export default function SearchBar(){
    return(
        <div className=" flex gap-1 w-4/5 justify-center">
            <Image
            className="h-6 mb-auto -mr-8 relative  mt-2 pt-1 "
            src={bb}
            alt="search"
            width={20}
            height={10}
            />
            <input className="h-10 w-4/5 rounded-3xl  border-none bg-body pl-10" placeholder="search for creators,inspirations,projects..." type="text" />
        </div>
    )
}