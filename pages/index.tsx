import "../src/app/globals.css";
import SideCard from "../src/app/ui/activity";
import Stories from "../src/app/ui/stories";
import Messages from "../src/app/ui/messages";
import Cookies from "js-cookie";
import { useEffect, useState ,useContext} from "react";
import FollowerUi from "@/app/ui/followerUI";
import { AppContext } from "../public/context/AppContext";
interface followerUiProp {
  avatar: any;
  src: string;
  name: string;
  following: boolean;
  _id:string;
}
export default function Homepage() {
  const userCookie = Cookies.get("user");
  const userData = userCookie && JSON.parse(userCookie);
  const [allUsers, setAllUsers] = useState<followerUiProp[]>([]);
  const {followerArray}=useContext(AppContext)
 

  const fetchAllusers = async () => {
    try {
      const res = await fetch(
        "https://ephraim-iyanda.onrender.com/user/allUsers"
      );
      const Users = await res.json();
      setAllUsers(Users);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchAllusers();
  }, []);


  return (
    <div className="homepage  flex m-auto justify-around xl:justify-between max-w-[75rem]  pt-2  overflow-y-auto  h-full ">
      <aside className="col-span-2 col-start-2  overflow-y-auto hidden sm:hidden xl:grid w-[20%] pt-1 pr-1 pl-1">
        <SideCard />
      </aside>
      <main className="stories flex flex-col gap-2 home w-full max-w-[600px] pr-1 h-fit">

        <div className=" followerBar w-full flex overflow-x-auto gap-2 pb-2  max-w-[580px] h-[180px] m-auto">
          {allUsers &&
            allUsers.map((users: followerUiProp, index) => (
              <FollowerUi
                key={index}
                src={users.avatar}
                name={users.name}
                _id={users._id}
                following={followerArray && followerArray.includes(users._id)?false:true}
              />
            ))}
        </div>
<div className="pb-20"> 
        <Stories />
        </div>
      </main>
      <aside className=" xl:col-span-2 activity  flex xl:w-[22%] flex-col gap-4 overflow-y-auto  pb-10 pr-1 pl-1 w-[25%] pt-1">
        <div>
          <Messages />
        </div>
        <div>
          <SideCard />
        </div>
      </aside>
    </div>
  );
}
