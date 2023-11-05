import service from "@/services";
import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const usePostById = (id: string | undefined) => {
  console.log({ id });
  return useQuery(
    ["GET_POST_BY_ID", id],
    async (): Promise<Post> => {
      const { data } = await service({
        url: `/user/post/${id}`,
      });
      return data?.[0];
    },
    { enabled: !!id }
  );
};
