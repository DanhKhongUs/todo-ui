import { createContext, ReactNode, useContext } from "react";
import { useAuthProvider } from "./useAuthProvider";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  actions: {
    signup: (credentials: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => Promise<string | undefined>;
    signin: (credentials: {
      email: string;
      password: string;
    }) => Promise<string | undefined>;
    signout: () => Promise<string | void>;
  };
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
