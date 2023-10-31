import service from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useUnseenNotificationCount = () => {
  return useQuery(["GET_UNSEEN_NOTIFICATION_COUNT"], async () => {
    const { data } = await service({
      url: "/user/getUnseenNotificationsCount",
    });
    return data;
  });
};
