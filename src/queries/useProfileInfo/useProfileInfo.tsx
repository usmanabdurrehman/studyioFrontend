import service from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useLoggedUser } from "../useLoggedUser";

export const useProfileInfo = (id?: string) => {
  const { data: user } = useLoggedUser();
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
