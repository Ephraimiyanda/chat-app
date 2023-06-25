import Image from "next/image"
import ProfilePic from "./images/profile-pic.png"
import addFriend from "./images/addFriend.png"
export default function SideCard(){
    return(
        <div className="h-fit pb-8 p-2 pt-1 bg-white rounded-2xl flex flex-col ">
            <div className="flex justify-between mt-5 mb-5">
                <h2 className="font-bold text-xl">Activity</h2>
                <button className="text-light_grey">See all</button>
            </div>
            <p className=" font-bold text-xs mb-5">Stories About you</p>
            <div className="flex gap-2 ">
                <Image
                className="profile-pic"
                src={ProfilePic}
                alt="pictuer"
                />
                <div>
                <h2 className=" font-semibold">Mentions</h2>
                <p className="activity-time-text text-2xl">2 stories mentioned you</p>
                </div>
            </div>
           <div className="flex flex-col gap-2">
            <h2 className="font-bold mb-0 mt-2">New</h2>

            <div className="flex justify-between">
                <div className="flex gap-2">
                <Image
                className="profile-pic"
                src={ProfilePic}
                alt="pictuer"
                />
                <div className=" ">
                <h2 className=" font-semibold">Clark kent</h2>
                <div className="flex">  <p className="activity-text">started following you. </p><p className="activity-time-text"> 1m</p></div>
                </div>
            </div>
            
                <div>
                    <button className=" w-12 h-12 rounded-3xl bg-pink-100 profile-pic">
                    <Image
                    className=" align-middle ml-auto mr-auto "
                    src={addFriend}
                    alt="add friend"
                    />
                    </button>
                </div>
            </div>

            <div className="flex justify-between">
            <div className="flex gap-2">
                <Image
                className="profile-pic"
                src={ProfilePic}
                alt="pictuer"
                />
                <div className=" ">
                <h2 className=" font-semibold">Clark kent</h2>
                <div className="flex">  <p className="activity-text">started following you. </p><p className="activity-time-text"> 1m</p></div>
                </div>
            </div>
            
                <div><button className=" w-12 h-12 rounded-3xl bg-pink-100 profile-pic">
                    <Image
                    className=" align-middle ml-auto mr-auto "
                    src={addFriend}
                    alt="add friend"
                    />
                    </button></div>
                </div>

                <div className="flex justify-between">
            <div className="flex gap-2">
                <Image
                className="profile-pic"
                src={ProfilePic}
                alt="pictuer"
                />
                <div className="  ">
                <h2 className=" font-semibold">Clark kent</h2>
                <div className="flex">  <p className="activity-text">started following you. </p><p className="activity-time-text"> 1m</p></div>
                </div>
            </div>
                <div><button className=" w-12 h-12 rounded-3xl bg-pink-100 profile-pic">
                    <Image
                    className=" align-middle ml-auto mr-auto "
                    src={addFriend}
                    alt="add friend"
                    />
                    </button></div>
                </div>


                <div className="flex justify-between">
            <div className="flex gap-2">
                <Image
                className="profile-pic"
                src={ProfilePic}
                alt="pictuer"
                />
                <div className="  ">
                <h2 className=" font-semibold">Clark kent</h2>
                <div className="flex">  <p className="activity-text">started following you. </p><p className="activity-time-text"> 1m</p></div>
                </div>
            </div>
                <div><button className=" w-12 h-12 rounded-3xl bg-pink-100 profile-pic">
                    <Image
                    className=" align-middle ml-auto mr-auto "
                    src={addFriend}
                    alt="add friend"
                    />
                    </button></div>
                </div>



                <div className="flex justify-between">
            <div className="flex gap-2">
                <Image
                className="profile-pic"
                src={ProfilePic}
                alt="pictuer"
                />
                <div className="  ">
                <h2 className=" font-semibold">Clark kent</h2>
                <div className="flex">  <p className="activity-text">started following you. </p><p className="activity-time-text"> 1m</p></div>
                </div>
            </div>
            
                <div><button className=" w-12 h-12 rounded-3xl bg-pink-100 profile-pic">
                    <Image
                    className=" align-middle ml-auto mr-auto "
                    src={addFriend}
                    alt="add friend"
                    />
                    </button></div>
                </div>
           </div>
        </div>
    )
}