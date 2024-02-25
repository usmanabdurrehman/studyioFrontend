import service from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useFetchNames = (name: string) => {
  return useQuery(
    ["GET_FETCH_NAMES", name],
    async (): Promise<{ _id: string; name: string }[]> => {
      const { data } = await service({
        url: "/user/fetchNames",
        method: "post",
        data: { name },
      });
      return data;
    },
    {
      enabled: !!name,
    }
  );
};
