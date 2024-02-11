import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfilePicture = () => {
  return useMutation(async (formdata: FormData) => {
    const { data } = await service({
      method: "post",
      url: "/user/updateProfileImage",
      data: formdata,
    });
    return data;
  });
};
