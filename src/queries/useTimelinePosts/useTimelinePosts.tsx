import service from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useTimelinePosts = () => {
  return useQuery(
    ["GET_TIMELINE_INFO"],
    async () => {
      const { data } = await service({
        url: "/user/timelinePosts",
      });
      return data;
    },
    {
      cacheTime: 0,
    }
  );
};
