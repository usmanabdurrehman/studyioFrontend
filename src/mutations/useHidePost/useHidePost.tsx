import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useHidePost = () => {
  return useMutation(async (postId) => {
    const { data } = await service({
      url: "/user/hidePost",
      method: "put",
      data: { postId },
    });
    return data;
  });
};
