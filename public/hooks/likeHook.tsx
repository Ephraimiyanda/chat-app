import { useState } from "react";
import Cookies from "js-cookie";
import useSWR, { Fetcher } from "swr";

interface LikeResponse {
  likerId: string;
  likedAt: string;
}

export default function useLike() {
  const user = JSON.parse(Cookies.get("user") as string);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const Like: Fetcher<LikeResponse> = async (url: string) => {
    const LikedStory = {
      likerId: user.id,
    };
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LikedStory),
      });

      // Assuming the response contains data in JSON format
      const data = await response.json();
      setLoading(false);
      setSuccess(true); // Set success to true upon successful like
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Error while liking the post. Please try again later."); // Set error message on error
      return null;
    }
  };

  const Unlike: Fetcher<LikeResponse> = async (url: string) => {
    const UnlikedStory = {
      likerId: user.id,
    };
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UnlikedStory),
      });

      // Assuming the response contains data in JSON format
      const data = await response.json();
      setLoading(false);
      setSuccess(false); // Set success to false upon successful unlike
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Error while unliking the post. Please try again later."); // Set error message on error
      return null;
    }
  };

  const likePost = async (url: string) => {
    setError(null); // Clear previous errors
    try {
      // Check if the post is already liked
      if (success) {
        // If liked, perform unlike operation
        await Unlike(url);
      } else {
        // If not liked, perform like operation
        await Like(url);
      }
    } catch (error) {
      console.log("Error while performing like/unlike:", error);
    }
  };

  return {
    loading,
    error,
    success,
    likePost,
  };
}
 