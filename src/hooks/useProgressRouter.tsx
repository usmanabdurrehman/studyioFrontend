import * as NProgress from "nprogress";
import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const useProgressRouter = (): AppRouterInstance => {
  const router = useRouter();
  const pathname = usePathname();

  return {
    ...router,
    push: (path, ...args) => {
      if (path.startsWith(pathname)) return;
      NProgress.start();
      router.push(path, ...args);
    },
  };
};
