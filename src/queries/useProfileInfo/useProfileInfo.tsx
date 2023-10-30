import service from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useProfileInfo = (id: string) => {
  return useQuery(
    ["GET_PROFILE_INFO", id],
    async () => {
      const { data } = await service({
        url: `/user/profile/${id}`,
      });
      return data;
    },
    {
      enabled: !!id,
    }
  );
};
