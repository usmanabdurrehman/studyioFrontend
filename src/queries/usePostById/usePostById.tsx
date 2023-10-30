import service from "@/services";
import { useQuery } from "@tanstack/react-query";

export const usePostById = (id: string) => {
  return useQuery(
    ["GET_POST_BY_ID", id],
    async (id) => {
      const { data } = await service({
        url: `/user/post/${id}`,
      });
      return data;
    },
    { enabled: !!id }
  );
};
