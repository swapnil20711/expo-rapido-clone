import { storage, tokenStorage } from "@/store/storage";
import { WSService } from "@/types/WSService";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Socket, io } from 'socket.io-client'
import { SOCKET_URL } from "./config";
import { refreshTokens } from "./apiInterceptors";

const WSContext = createContext<WSService | undefined>(undefined);

export const WSProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socketAccessToken, setSocketAccessToken] = useState<string | null>(null);
  const socket = useRef<Socket>()

  useEffect(() => {
    const accessToken = tokenStorage.getString("access_token") as any;
    setSocketAccessToken(accessToken)
  }, [])

  useEffect(() => {
    if (socketAccessToken) {
      if (socket.current) {
        socket.current.disconnect();
      }
    }
    socket.current = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
      extraHeaders: {
        access_token: socketAccessToken || ""
      }
    })

    socket.current.on("connect_error", (error) => {
      if (error.message === "Authentication error") {
        console.log(error.message)
        refreshTokens();
      }
    })

    return () => {
      socket.current?.disconnect();
    }
  }, [socketAccessToken])

  const emit = (event: string, data: any = {}) => {
    socket.current?.emit(event, data)
  }

  const on = (event: string, cb: (data: any) => void) => {
    socket.current?.on(event, cb)
  }

  const off = (event: string) => {
    socket.current?.off(event)
  }

  const removeListener = (listenerName: string) => {
    socket.current?.removeListener(listenerName)
  }

  const disconnect = () => {
    socket.current?.disconnect();
    socket.current = undefined
  }

  const updateAccessTokens = () => {
    const token = tokenStorage.getString("access_token") as any;
    setSocketAccessToken(token)
  }

  const socketService: WSService = {
    initializeSocket: () => { },
    emit,
    on,
    off,
    disconnect,
    removeListener,
    updateAccessTokens
  }

  return (
    <WSContext.Provider value={socketService}>
      {children}
    </WSContext.Provider>
  )
};

const useWS = (): WSService => {
  const socketService = useContext(WSContext);
  if (!socketService) {
    throw new Error("useWS must be used inside a WSProvider")
  }
  return socketService;
}