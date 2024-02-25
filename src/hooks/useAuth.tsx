import Cookies from "js-cookie";

const getToken = () => Cookies.get("token") || "";
const handleLogin = ({
  rememberMe,
  token,
}: {
  rememberMe: boolean;
  token: string;
}) => Cookies.set("token", token, { expires: rememberMe ? 21 : undefined });

const handleLogout = () => Cookies.remove("token");

export const useAuth = () => {
  return { getToken, handleLogin, handleLogout };
};
