import service from "@/services";
import { Post, User } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useLoggedUser = () => {
  return useQuery(["GET_LOGGED_IN_USER"], async (): Promise<User> => {
    const { data } = await service({
      url: `/user/loggedIn`,
    });
    return data;
  });
};
