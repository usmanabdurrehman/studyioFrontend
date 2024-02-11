import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useCreateConversation = () => {
  return useMutation(async (id: string) => {
    const { data } = await service({
      url: "/user/conversations",
      method: "post",
      data: { id },
    });
    return data;
  });
};
