import service from "@/services";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useLoggedUser } from "../useLoggedUser";

export const useProfileInfo = (id?: string) => {
  const { loggedInUserId } = useStore();
  const ID = id || loggedInUserId;

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
