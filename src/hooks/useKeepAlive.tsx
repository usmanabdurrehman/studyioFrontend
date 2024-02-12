import service from "@/services";
import { useQuery } from "@tanstack/react-query";

const FOUR_MINUTES = 240000;

export const useKeepAlive = () =>
  useQuery(
    ["KEEP_ALIVE"],
    async () => {
      const { data } = await service.get("/");
      return data;
    },
    { refetchInterval: FOUR_MINUTES }
  );
