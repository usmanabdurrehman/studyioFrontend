import service from "@/services";
import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useTimelinePosts = () => {
  return useQuery(["GET_TIMELINE_INFO"], async (): Promise<Post[]> => {
    const { data } = await service({
      url: "/user/timelinePosts",
    });
    return data;
  });
};
