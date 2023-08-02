import Cookies from "js-cookie";
import useSWR, { Fetcher } from "swr";

interface LikeResponse {
  likerId: string;
  likedAt: string;
}

export default function useLike(storyId: string) {
  const user = JSON.parse(Cookies.get("user") as string);

  const Like: Fetcher<LikeResponse> = async (url: string) => {
    const LikedStory = {
      likerId: user.id,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LikedStory),
      });

      // Assuming the response contains data in JSON format
      return response.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const { data: story, mutate } = useSWR<LikeResponse>(
    `http://localhost:5000/like/${storyId}`,
    Like,
    {
      refreshInterval: 1000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      revalidateIfStale: true,
    }
  );

  return {
    story,
    likePost: mutate,
  };
}
