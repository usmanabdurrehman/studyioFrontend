import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useSeeNotifications = () => {
  return useMutation(async () => {
    const { data } = await service({
      url: "/user/seeNotifications",
    });
    return data;
  });
};
