import service from "@/services";
import { useUserStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

export const useProfileInfo = (id?: string) => {
  const user = useUserStore((store) => store.user);
  const ID = id || user?._id;

  return useQuery(
    ["GET_PROFILE_INFO", ID],
    async () => {
      const { data } = await service({
        url: `/user/profile/${ID}`,
      });
      return data;
    },
    {
      enabled: !!ID,
    }
  );
};
