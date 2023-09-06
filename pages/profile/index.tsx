import Image from "next/image";
import Link from "next/link";
import ProfilePic from "../../src/app/ui/images/profile-pic.png";
import { useContext } from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useFetch from "../../public/fetch/userfetch";
import Loader from "@/app/ui/loader";
import share from "../../src/app/ui/images/share.png";
import comment from "../../src/app/ui/images/comment.png";
import like from "../../src/app/ui/images/like.png";
import bookmark from "../../src/app/ui/images/bookmark.png";
import FollowerUi from "@/app/ui/AccountUi/followerUI";
import { AppContext } from "../../public/context/AppContext";
import FollowUnfollowBtn from "@/app/ui/buttons/followButtons";
import ContactProps from "@/app/ui/contactProps";
interface posts {
  text: string;
  sender: string;
  _id: string;
  content: string;
  dateJoined: string;
  avatar: string;
}
interface user {
  user: {
    avatar: string;
    name: string;
    _id: string;
  };
}
interface Stats {
    postCount: string;
    followersCount: string;
    followingCount: string;
  }
export default function Profile() {
  const user= JSON.parse(Cookies.get("user") as string)
  const [sortedData, setSortedData] = useState([]);
  const [statistics, setStatistics] = useState<Stats>();
  const  userId  = user._id;
  const userCookie = Cookies.get("user");
  const userData = userCookie && JSON.parse(userCookie);
  const { followerArray } = useContext(AppContext);
  const regex = new RegExp(
    /[^\s]+(.*?).(jpg|jpeg|png|gif|svg\+xml|JPG|JPEG|SVG|svg|PNG|GIF)$/
  );

  const fetchPosts = async () => {
    try {
      const res = await fetch(
        `https://ephraim-iyanda.onrender.com/user/post/user/${userId}`
      );
      const sortedData = await res.json();
      setSortedData(sortedData.posts);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchStatistics = async () => {
    try {
      const res = await fetch(
        `https://ephraim-iyanda.onrender.com/user/statistics/${userId}`
      );
      const stats = await res.json();
      setStatistics(stats);
    } catch (error) {
      console.log(error);
    }
  };
useEffect(()=>{
  fetchPosts()
  fetchStatistics()
},[])

  if (!userId ||!user) {
    return <Loader />;
  }
  return (
    <div className="bg-white h-screen overflow-auto pb-20">
      {user && (
        <div className="w-[100%] sm:w-[80%] pt-6 ml-auto mr-auto ">
          <div className="w-[90%] sm:w-[80%] ml-auto mr-auto flex flex-col gap-4 pb-[20px] border-b border-b-stone-300 ">
            <div className="flex  gap-3 m-auto w-fit ">
              <Image
                className=" w-40 h-40 rounded-[200px]  ml-auto mr-auto"
                src={user.avatar}
                alt="profile pic"
                width={50}
                height={50}
              />
              <div className="w-[80%] flex flex-col gap-4 h-fit m-auto">
                <div className="flex gap-2">
                  <h2 className="text-center w-fit p-3">{user.name}</h2>
                  <button className="bg-[#F3F4F6] p-3 rounded-lg">
                      Edit profile
                    </button>
                </div>
                <div className="flex gap-4 mr-auto w-fit flex-wrap justify-center pb-[20px] ">
                  <p>
                    <span className=" font-semibold">{statistics?.postCount} </span>{" "}
                   post
                  </p>
                  <p>
                    <span className=" font-semibold">{statistics?.followersCount}</span>{" "}
                    <Link href={`/Accounts/followers/${user._id}`}>
                      Followers
                    </Link>
                  </p>
                  <p>
                    <span className=" font-semibold">{statistics?.followingCount}</span>{" "}
                    <Link href={`/Accounts/following/${user._id}`}>
                      Following
                    </Link>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="home max-w-[600px] flex flex-col gap-5  ml-auto mr-auto md:pl-2 md:pr-2 pt-3 pb-3">
              {sortedData && sortedData.length > 0 ? (
                sortedData.map((posts: posts, index: number) => {
                  const { _id, sender, dateJoined, content, text } = posts;

                  return (
                    <section
                      key={`${_id}-${dateJoined}`}
                      className="pl-3 pr-3 pt-3 rounded-lg bg-white w-full m-auto box-shadow"
                    >
                      <div className=" pb-2 ">
                      <div>

                  <ContactProps
                    contactAvatar={user.avatar}
                    contactName={user.name}
                    contactText={`About ${new Date(
                     dateJoined
                    )
                      .toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })
                      .toLocaleLowerCase()} on ${new Date(dateJoined).toDateString()}`}
                  />
                     </div>
                        <p className="pt-1 pb-1 max-w-[550px] border-b border-b-stone-300">
                          {posts.text}
                        </p>
                      </div>
                      <div className="relative rounded-lg">
                        <div className=" h-fit">
                          {!regex.test(posts?.content) ? (
                            <video
                              className=" h-full rounded-md object-cover"
                              controls
                              src={posts?.content}
                            ></video>
                          ) : (
                            <Image
                              //  loader={imageLoader}
                              src={posts?.content}
                              className="rounded-lg   h-auto w-full"
                              alt="story picture"
                              width={550}
                              height={100}
                            />
                          )}
                        </div>
                        <div className=" bottom-0 left-0 w-full  pt-3 pb-3 flex items-center justify-between">
                          <div className="flex gap-4 flex-row-reverse">
                            <button>
                              <Image src={share} alt="Share" width={20} />
                            </button>
                            <button>
                              <Image src={comment} alt="Comment" width={20} />
                            </button>
                            <button>
                              <Image src={like} alt="Like" width={20} />
                            </button>
                          </div>
                          <button>
                            <Image src={bookmark} alt="Bookmark" width={20} />
                          </button>
                        </div>
                      </div>
                    </section>
                  );
                })
              ) : (
                <p className="py-2 px-2 w-fit m-auto">{`${user.name} does not have any posts`}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );



}
