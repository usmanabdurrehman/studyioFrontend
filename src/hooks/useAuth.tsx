import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useProgressRouter } from "./useProgressRouter";
import { PATH } from "@/constants";

export const useAuth = () => {
  const pathname = usePathname();
  const router = useProgressRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");

    if (
      isLoggedIn &&
      ![
        pathname === PATH.TIMELINE,
        pathname.startsWith(PATH.PROFILE),
        pathname.startsWith(PATH.POST),
      ].some((cond) => cond)
    ) {
      router.push(PATH.TIMELINE);
    }
    if (
      !isLoggedIn &&
      ![pathname === PATH.SIGNIN, pathname === PATH.SIGNUP].some((cond) => cond)
    )
      router.push(PATH.SIGNIN);
  }, [pathname]);
};
