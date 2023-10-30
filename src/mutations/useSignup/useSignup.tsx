import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation(async (formdata) => {
    const { data } = await service({
      url: "/signup",
      method: "post",
      data: formdata,
    });
    return data;
  });
};
