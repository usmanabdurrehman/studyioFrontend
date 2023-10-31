import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useUnfollowPerson = () => {
  return useMutation(async (id: string) => {
    const { data } = await service({
      method: "delete",
      url: "/user/follow",
      data: { userId: id },
    });
    return data;
  });
};
