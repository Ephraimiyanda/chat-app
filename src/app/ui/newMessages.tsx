import Image, { ImageProps } from "next/image";
import ProfilePic from "./images/profile-pic.png";
import SearchBar from "./search components/search bar";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../public/context/AppContext";
import ContactProps from "./contactProps";
interface Follower {
  name: string;
  _id: string;
  avatar: string;
}
export default function NewMessages() {
  const { user } = useContext(AppContext);
  const [messengers, setMessengers] = useState<Follower[]>([]);
  const LastmessageSenders = async () => {
    try {
      const messengerData = await fetch(
        `https://ephraim-iyanda.onrender.com/user/last-message-senders/${user._id}`
      );
      const messageDataRes = await messengerData.json();
      setMessengers(messageDataRes.senders);
      console.log(messageDataRes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    LastmessageSenders();
  }, [user]);

  return (
    <div className="h-[440px] pb-8 p-2 pt-1 bg-white rounded-2xl flex flex-col box-shadow">
      <div className="flex justify-between mt-5 mb-5">
        <h2 className="font-bold text-xl">Messages</h2>
        <button className="text-light_grey">See all</button>
      </div>
      <div></div>
      <div className=" flex justify-between  font-bold border-b border-b-slate-200 mt-4 mb-3 flex-wrap ">
        <p className="border-b-2 border-b-white hover:border-b-2 hover:border-b-black cursor-pointer">
          Primary
        </p>
        <p className="border-b-2  border-b-white hover:border-b-2 hover:border-b-black cursor-pointer">
          General
        </p>
        <p className="border-b-2  border-b-white text-pink-500  hover:border-b-2 hover:border-b-pink-500 cursor-pointer">
          Request (2)
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {messengers.map((messenger, index) => (
          <div key={index} className="flex justify-between  hover:bg-[#ededed] p-1">
            <div className="flex gap-2">
              <Link href={`/chat/${messenger._id}`}>
                <div className="flex gap-2">
                  <Image
                    className="profile-pic"
                    src={messenger.avatar}
                    alt="picture"
                    width={27}
                    height={27}
                  />
                  <div>
                    <h2 className=" font-semibold  ">{messenger.name}</h2>
                    <div className="flex">
                      {" "}
                      <p className="activity-time-text font-semibold ">
                        you have a new message{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
44725627817;
