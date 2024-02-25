import { Socket } from "socket.io-client";
import { create } from "zustand";

export const useStore = create<{
  socket?: Socket;
  setSocket: (socket: Socket) => void;
  loggedInUserId: string | undefined;
  setLoggedInUserId: (id: string | undefined) => void;
}>()((set) => ({
  socket: undefined,
  setSocket: (socket) => set({ socket }),
  loggedInUserId: undefined,
  setLoggedInUserId: (loggedInUserId) => set({ loggedInUserId }),
}));
