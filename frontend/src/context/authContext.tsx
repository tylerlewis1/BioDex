import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

type AuthContextType = {
  token: string | null;
  isLoading: boolean;
  saveKey: (jwt: string) => Promise<void>;
  removeKey: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  isLoading: true,
  saveKey: async () => {},
  removeKey: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync("biodex_jwt").then((savedToken) => {
      setToken(savedToken);
      setIsLoading(false);
    });
  }, []);

  const saveKey = async (jwt: string) => {
    await SecureStore.setItemAsync("biodex_jwt", jwt);
    setToken(jwt);
  };

  const removeKey = async () => {
    await SecureStore.deleteItemAsync("biodex_jwt");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{token, isLoading, saveKey, removeKey}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
