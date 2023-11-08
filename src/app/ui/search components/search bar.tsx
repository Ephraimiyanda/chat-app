import Image from "next/image";
import bb from "../images/Union.png";
import {useContext, useState} from "react"
import { AppContext } from "../../../../public/context/AppContext";
export default function SearchBar() {
  const [selected, setSelected] = useState<any>("people");
  const { showSearchbar,setShowSearchbar } = useContext(AppContext); 
  return (
    <div>
      <div
        className="searchbar flex gap-1   h-10  rounded-3xl cursor-pointer  border-none pl-2 bg-body lg:w-[590px] w-[95%]  ml-[10px] "
        onClick={()=>setShowSearchbar(true)}
      >
        <Image
          className="h-6 mb-auto cursor-pointer  mt-2 pt-1 "
          src={bb}
          alt="search"
          width={20}
          height={10}
        />
        <input
          className=" w-[80%] bg-body focus:outline-none cursor-pointer"
          placeholder="search for creators,inspirations,projects..."
          type="text"
        />
      </div>
    </div>
  );
}
