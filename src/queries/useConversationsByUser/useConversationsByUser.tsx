import service from "@/services";
import { useStore } from "@/store";
import { Conversation } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useConversationsByUser = () => {
  const { loggedInUserId } = useStore();

  return useQuery(
    ["GET_CONVERSATIONS_BY_USER", loggedInUserId],
    async (): Promise<Conversation[]> => {
      const { data } = await service({
        url: `/user/conversations`,
      });
      return data?.conversations;
    }
  );
};
