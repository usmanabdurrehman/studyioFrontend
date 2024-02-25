import service from "@/services";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

export const useUnseenNotificationCount = () => {
  const { loggedInUserId } = useStore();

  return useQuery(
    ["GET_UNSEEN_NOTIFICATION_COUNT", loggedInUserId],
    async (): Promise<number> => {
      const { data } = await service({
        url: "/user/getUnseenNotificationsCount",
      });
      return data?.notificationCount;
    }
  );
};
