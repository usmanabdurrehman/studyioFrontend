import service from "@/services";
import { Conversation } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useConversationById = (id: string | undefined) => {
  return useQuery(
    ["GET_CONVERSATION_BY_ID", id],
    async (): Promise<Conversation> => {
      const { data } = await service({
        url: `/user/conversations/${id}`,
      });
      return data?.conversation;
    },
    {
      enabled: !!id,
    }
  );
};
