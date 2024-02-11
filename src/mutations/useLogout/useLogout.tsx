import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  return useMutation(async () => {
    const { data } = await service({
      url: "/user/logout",
    });
    return data;
  });
};
