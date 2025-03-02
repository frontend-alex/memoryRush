import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "@/hooks/useAppwrite";
import { io, Socket } from "socket.io-client";
import { URL } from "@/constants/data";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch: () => Promise<void>;
  socket: Socket | null; 
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (user) {
      const newSocket = io(URL);
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Connected to server");
      });

      newSocket.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });

      return () => {
        newSocket.disconnect();
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [user]);

  const isLogged = !!user;

  return (
    <GlobalContext.Provider value={{ isLogged, user, loading, refetch, socket }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export default GlobalProvider;