import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useDeletePost = () => {
  return useMutation(async (id: string) => {
    const { data } = await service({
      url: "/user/posts",
      method: "delete",
      data: { postId: id },
    });
    return data;
  });
};
