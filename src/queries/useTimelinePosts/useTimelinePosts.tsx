import service from "@/services";
import { useStore } from "@/store";
import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useTimelinePosts = () => {
  const { loggedInUserId } = useStore();

  return useQuery(
    ["GET_TIMELINE_INFO", loggedInUserId],
    async (): Promise<Post[]> => {
      const { data } = await service({
        url: "/user/timelinePosts",
      });
      return data;
    }
  );
};
