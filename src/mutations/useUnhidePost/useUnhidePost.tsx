import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useUnhidePost = () => {
  return useMutation(async (postId: string) => {
    const { data } = await service({
      url: "/user/unhidePost",
      method: "put",
      data: { postId },
    });
    return data;
  });
};
