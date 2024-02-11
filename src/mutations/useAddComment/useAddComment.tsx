import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useAddComment = () => {
  return useMutation(
    async ({ comment, postId }: { comment: string; postId: string }) => {
      const { data } = await service({
        method: "post",
        url: "/user/comments",
        data: { comment, postId },
      });
      return data;
    }
  );
};
