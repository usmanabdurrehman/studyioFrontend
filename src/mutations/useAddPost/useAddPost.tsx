import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useAddPost = () => {
  return useMutation(async (formdata: FormData) => {
    const { data } = await service({
      url: "/user/posts",
      method: "post",
      data: formdata,
    });
    return data;
  });
};
