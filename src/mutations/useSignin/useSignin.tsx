import service from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useSignin = () => {
  return useMutation(async (fields) => {
    const { data } = await service({
      url: "/signin",
      method: "post",
      data: fields,
    });
    return data;
  });
};
