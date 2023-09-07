import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import FollowFollowingUi from "@/app/ui/AccountUi/followFollowingUi";
import Loader from "@/app/ui/loader";

interface Follower {
  avatar: any;
  name: string;
  _id: string;
}

interface Stats {
  postCount: string;
  followersCount: string;
  followingCount: string;
}

export default function UserFollowers() {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [statistics, setStatistics] = useState<Stats[]>([]);
  const router = useRouter();
  const { userId } = router.query;
  const userCookie = Cookies.get("user");
  const userData = userCookie && JSON.parse(userCookie);

  const fetchFollowers = async () => {
    try {
      const res = await fetch(
        `https://ephraim-iyanda.onrender.com/user/followers/users/${userId}`
      );
      const followersData = await res.json();
      setFollowers(followersData.followers);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStatistics = async (followerId: string) => {
    try {
      const res = await fetch(
        `https://ephraim-iyanda.onrender.com/user/statistics/${followerId}`
      );
      const stats = await res.json();
      setStatistics((prevStats) => [...prevStats, stats]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchFollowers();
    }
  }, [userId, router.isReady]);

  useEffect(() => {
    if (followers.length > 0) {
      followers.forEach((follower) => {
        fetchStatistics(follower._id);
      });
    }
  }, [followers]);

  if (!followers || followers.length === 0) {
    return <Loader />;
  }

  return (
    <div className="bg-white h-full overflow-auto ">
      {followers.map((follower: Follower, index: number) => {
        const { avatar, name, _id } = follower;
        const followerStats = statistics[index] || {};

        return (
          <div className="px-2 py-2 m-auto bg-white" key={_id}>
            <FollowFollowingUi
              key={_id}
              src={avatar}
              name={name}
              followerNo={followerStats.followersCount || "0"}
              followingNo={followerStats.followingCount || "0"}
              postNo={followerStats.postCount || "0"}
              _id={_id}
            />
          </div>
        );
      })}
    </div>
  );
}
