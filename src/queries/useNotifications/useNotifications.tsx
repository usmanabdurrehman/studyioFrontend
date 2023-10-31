import service from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useNotifications = () => {
  return useQuery(["GET_NOTIFICATIONS"], async () => {
    const { data } = await service({
      url: "/user/notifications",
    });
    return data;
  });
};
