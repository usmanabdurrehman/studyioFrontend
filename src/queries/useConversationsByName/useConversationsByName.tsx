import service from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useConversationsByName = (name: string) => {
  return useQuery(
    ["GET_CONVERSATIONS_BY_NAME", name],
    async (): Promise<
      { _id: string; name: string; profileImage: string }[]
    > => {
      const { data } = await service.post("/user/conversations/more", {
        method: "post",
        url: "/user/conversations/more",
        body: { name },
      });
      return data;
    },
    { enabled: !!name }
  );
};
