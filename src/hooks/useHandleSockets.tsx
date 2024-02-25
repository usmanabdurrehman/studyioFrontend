import { useLoggedUser } from "@/queries";
import { useStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import socketClient from "socket.io-client";
import { useAuth } from "./useAuth";

export const useHandleSockets = () => {
  const { socket, setSocket } = useStore();
  const { data: loggedUser } = useLoggedUser();
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  useEffect(() => {
    if (loggedUser) {
      const socketInstance = socketClient(
        process.env.NEXT_PUBLIC_BACKEND_URL || "",
        {
          withCredentials: true,
          extraHeaders: {
            Authorization: getToken(),
          },
        }
      );
      socketInstance.on("notificationChange", () => {
        queryClient.invalidateQueries(["GET_NOTIFICATIONS", loggedUser?._id]);
      });
      socketInstance.on("messageChange", ({ conversationId }) => {
        queryClient.invalidateQueries([
          "GET_CONVERSATION_BY_ID",
          conversationId,
        ]);
      });
      socketInstance.emit("joinRoom", { id: loggedUser._id });
      setSocket(socketInstance);
    }
  }, [loggedUser]);
};
