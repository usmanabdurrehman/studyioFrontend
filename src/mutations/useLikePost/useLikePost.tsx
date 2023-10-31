import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useLikePost = () => {
  return useMutation(async (postId: string) => {
    const { data } = await service({
      method: "post",
      url: "/user/likes",
      data: { postId },
    });
    return data;
  });
};
