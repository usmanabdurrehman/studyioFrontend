import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useFollowPerson = () => {
  return useMutation(async (id: string) => {
    const { data } = await service({
      method: "post",
      url: "/user/follow",
      data: { userId: id },
    });
    return data;
  });
};
