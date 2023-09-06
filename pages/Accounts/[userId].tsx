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
export default function Account() {
  const [sortedData, setSortedData] = useState([]);
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState<user>();
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
      setSortedData(sortedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchUser();
      fetchPosts();
    }
  }, [userId, router.isReady]);

  return (
    <div className=" bg-white h-screen">
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
                    <span className=" font-semibold">1 </span>
                    <Link href={`/Accounts/posts/${user.user._id}`}>post</Link>
                  </p>
                  <p>
                    <span className=" font-semibold">23</span>
                    <Link href={`/Accounts/followers/${user.user._id}`}>
                      Followers
                    </Link>
                  </p>
                  <p>
                    <span className=" font-semibold">34</span>{" "}
                    <Link href={`/Accounts/following/${user.user._id}`}>
                      Following
                    </Link>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="home max-w-[600px] flex flex-col gap-5  ml-auto mr-auto md:pl-2 md:pr-2 pt-1 pb-3">
              {sortedData.length > 0 ? (
                sortedData.map((posts: posts, index: number) => {
                  const { _id, sender, dateJoined, content, text } = posts;

                  return (
                    <section
                      key={`${_id}-${dateJoined}`}
                      className="pl-3 pr-3 pt-3 rounded-lg bg-white w-full m-auto box-shadow"
                    >
                      <div className=" pb-2 ">
                        <FollowerUi
                          src={user.user.avatar}
                          name={user.user.name}
                          _id={user.user._id}
                          following={
                            followerArray &&
                            followerArray.includes(userId as string)
                              ? false
                              : true
                          }
                        />
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
                <p className="py-2 px-2 w-fit m-auto">{`${user.user.name} does not have any posts`}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
