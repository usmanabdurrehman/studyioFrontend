import * as NProgress from "nprogress";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const useProgressRouter = (): AppRouterInstance => {
  const router = useRouter();

  return {
    ...router,
    push: (...args) => {
      NProgress.start();
      router.push(...args);
    },
  };
};
