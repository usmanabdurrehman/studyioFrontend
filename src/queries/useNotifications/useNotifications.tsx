import service from "@/services";
import { Notification } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useNotifications = () => {
  return useQuery(
    ["GET_NOTIFICATIONS"],
    async (): Promise<Notification[]> => {
      const { data } = await service({
        url: "/user/notifications",
      });
      return data;
    },
    {
      meta: {
        skipGlobalLoader: true,
      },
    }
  );
};
