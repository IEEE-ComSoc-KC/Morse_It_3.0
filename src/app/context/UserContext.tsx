"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface UserContextType {
  name: string;
  finalString: string;
  userId: string;
  setName: (name: string) => void;
  setFinalString: (finalString: string) => void;
  setUserId: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state with values from localStorage if available
  const [name, setName] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("nameMorse") || "";
    }
    return "";
  });

  const [finalString, setFinalString] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("finalStringMorse") || "";
    }
    return "";
  });

  const [userId, setUserId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userIdMorse") || "";
    }
    return "";
  });

  // Update localStorage when state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nameMorse", name);
    }
  }, [name]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("finalStringMorse", finalString);
    }
  }, [finalString]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userIdMorse", userId);
    }
  }, [userId]);

  return (
    <UserContext.Provider
      value={{ name, finalString, userId, setName, setFinalString, setUserId }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
