import service from "@/services";
import { Notification } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store";

export const useNotifications = () => {
  const { loggedInUserId } = useStore();

  return useQuery(
    ["GET_NOTIFICATIONS", loggedInUserId],
    async (): Promise<Notification[]> => {
      const { data } = await service({
        url: "/user/notifications",
      });
      return data;
    }
  );
};
