import React, { useContext, useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type setUserInput = {
  username: string;
  email: string;
};

type userContextType = {
  username: string | null;
  email: string | null;
  isLoading: boolean;
  setUser: (input: setUserInput) => Promise<void>;
  removeUser: () => Promise<void>;
};

const userContext = createContext<userContextType>({
  username: null,
  email: null,
  isLoading: true,
  setUser: async () => {},
  removeUser: async () => {},
});

const USER_STORAGE_KEY = "user_metadata";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          const parsed: setUserInput = JSON.parse(storedUser);
          setUsername(parsed.username);
          setEmail(parsed.email);
        }
      } catch (error) {
        console.error("Failed to load user from storage:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const setUser = async (input: setUserInput) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(input));
      setEmail(input.email);
      setUsername(input.username);
    } catch (error) {
      console.error("Failed to save user to storage:", error);
    }
  };

  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setEmail("");
      setUsername("");
    } catch (error) {
      console.error("Failed to remove user from storage:", error);
    }
  };

  return (
    <userContext.Provider value={{ username, email, isLoading, setUser, removeUser }}>
      {children}
    </userContext.Provider>
  );
}

export const useUser = () => useContext(userContext);
