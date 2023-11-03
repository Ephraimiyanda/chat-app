import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import useFetch from "../../public/fetch/userfetch";
import Loader from "@/app/ui/loader";
import share from "../../src/app/ui/images/share.png";
import comment from "../../src/app/ui/images/comment.png";
import like from "../../src/app/ui/images/like.png";
import bookmark from "../../src/app/ui/images/bookmark.png";
import FollowerUi from "@/app/ui/AccountUi/followerUI";
import { AppContext } from "../../public/context/AppContext";
import { useContext } from "react";
import FollowUnfollowBtn from "@/app/ui/buttons/followButtons";
import ContactProps from "@/app/ui/contactProps";
import StorySection from "@/app/ui/postComponent";
import { Spinner } from "@nextui-org/react";
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
    dateJoined:string
  };
}
interface Stats {
    postCount: string;
    followersCount: string;
    followingCount: string;
  }
  
export default function Account() {
  const [sortedData, setSortedData] = useState([]);
  const [user, setUser] = useState<user>();
  const [statistics, setStatistics] = useState<Stats>();
  const router = useRouter();
  const { userId } = router.query;
  const userCookie = Cookies.get("user");
  const userData = userCookie && JSON.parse(userCookie);
  const { followerArray } = useContext(AppContext);
  const regex = new RegExp(
    /[^\s]+(.*?).(jpg|jpeg|png|gif|svg\+xml|JPG|JPEG|SVG|svg|PNG|GIF)$/
  );
  const fetchUser = async () => {
    try {
      const res = await fetch(
        `https://ephraim-iyanda.onrender.com/user/${userId}`
      );
      const user = await res.json();
      setUser(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const fetchPosts = async () => {
    try {
      const res = await fetch(
        `https://ephraim-iyanda.onrender.com/user/post/user/${userId}`
      );
      const sortedData = await res.json();
      setSortedData(sortedData.posts);
      console.log(sortedData);
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

  useEffect(() => {
    if (router.isReady) {
      fetchUser();
      fetchPosts();
      fetchStatistics();
    }
  }, [userId, router.isReady]);

  if (!userId ||!user) {
    return <Loader />;
  }
  const renderFollowerInfo = (sender: string) => {
    if (user) {
      const { avatar, name, dateJoined, _id } = user.user;

      return (
        <div>
          <ContactProps
            _id={_id}
            contactAvatar={avatar}
            contactName={name}
            contactText={`About ${new Date(dateJoined)
              .toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })
              .toLocaleLowerCase()} on ${new Date(dateJoined).toDateString()}`}
          />
        </div>
      );
    }

    return null; // Return null if follower information is not available
  };

  return (
    <div className="bg-white h-screen overflow-auto pb-20">
      {user && (
        <div className="w-[100%] sm:w-[80%] pt-6 ml-auto mr-auto ">
          <div className="w-[90%] sm:w-[80%] ml-auto mr-auto flex flex-col gap-4 pb-[20px] border-b border-b-stone-300 ">
            <div className="flex  gap-3 m-auto w-fit ">
              <Image
                className=" w-40 h-40 rounded-[200px]  ml-auto mr-auto"
                src={user.user.avatar}
                alt="profile pic"
                width={50}
                height={50}
              />
              <div className="w-[80%] flex flex-col gap-4 h-fit m-auto">
                <div className="flex gap-2">
                  <h2 className="text-center w-fit p-3">{user.user.name}</h2>
                  <FollowUnfollowBtn
                    following={
                      followerArray && followerArray.includes(user.user._id)
                        ? false
                        : true
                    }
                    _id={user.user._id}
                  />
                </div>
                <div className="flex gap-4 mr-auto w-fit flex-wrap justify-center pb-[20px] ">
                  <p>
                    <span className=" font-semibold">{statistics?.postCount} </span>{" "}
                   post
                  </p>
                  <p>
                    <span className=" font-semibold">{statistics?.followersCount}</span>{" "}
                    <Link href={`/Accounts/followers/${user.user._id}`}>
                      Followers
                    </Link>
                  </p>
                  <p>
                    <span className=" font-semibold">{statistics?.followingCount}</span>{" "}
                    <Link href={`/Accounts/following/${user.user._id}`}>
                      Following
                    </Link>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="home max-w-[600px] flex flex-col gap-5  ml-auto mr-auto md:pl-2 md:pr-2 pt-3 pb-3">
              {sortedData ?
        sortedData.map((post: posts, index: number) => (
          <StorySection
            key={`${post._id}-${post.dateJoined}`}
            post={post}
            renderFollowerInfo={renderFollowerInfo}
          />
        )):<div className="flex items-center justify-center"><p>no posts of <b>{user.user.name}</b> have been found</p></div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
