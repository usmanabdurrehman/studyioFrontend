import service from "@/services";
import { Conversation } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useCreateConversation = () => {
  return useMutation(async (id: string): Promise<Conversation> => {
    const { data } = await service({
      url: "/user/conversations",
      method: "post",
      data: { id },
    });
    return data?.conversation;
  });
};
