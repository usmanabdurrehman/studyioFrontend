import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useEditPost = () => {
  return useMutation(async (formdata: FormData) => {
    const { data } = await service({
      url: "/user/posts",
      method: "put",
      data: formdata,
    });
    return data;
  });
};
