import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useUnlikePost = () => {
  return useMutation(async (postId: string) => {
    const { data } = await service({
      method: "delete",
      url: "/user/likes",
      data: { postId },
    });
    return data;
  });
};
