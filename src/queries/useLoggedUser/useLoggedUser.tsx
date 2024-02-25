import service from "@/services";
import { useStore } from "@/store";
import { Post, User } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useLoggedUser = () => {
  const { loggedInUserId, setLoggedInUserId } = useStore();
  return useQuery(["GET_LOGGED_IN_USER"], async (): Promise<User> => {
    const { data } = await service({
      url: `/user/loggedIn`,
    });

    if (data?._id && !loggedInUserId) setLoggedInUserId(data?._id);
    return data;
  });
};
