import service from "@/services";
import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const usePostById = (id: string | undefined) => {
  return useQuery(
    ["GET_POST_BY_ID", id],
    async (): Promise<Post | { status: false }> => {
      const { data } = await service({
        url: `/user/post/${id}`,
      });
      return data;
    },
    { enabled: !!id }
  );
};
