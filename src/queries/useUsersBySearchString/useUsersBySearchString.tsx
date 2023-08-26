import { useQuery } from "@tanstack/react-query";

export const useUsersBySearchString = (search: string) => {
  return useQuery(
    ["GET_USERS_BY_SEARCH", search],
    async () => {
      return [
        {
          profileImage: "https://img.freepik.com/free-icon/user_318-563642.jpg",
          name: "Usman",
        },
        {
          profileImage: "https://img.freepik.com/free-icon/user_318-563642.jpg",
          name: "Ahmed",
        },
      ];
    },
    { enabled: !!search }
  );
};
