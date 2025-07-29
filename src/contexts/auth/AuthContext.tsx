import { createContext, ReactNode, useContext } from "react";
import { useAuthProvider } from "./useAuthProvider";

interface User {
  _id: string;
  name: string;
  email: string;
  verified?: boolean;
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  actions: {
    validate: () => Promise<User | null>;
    signup: (credentials: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => Promise<{ success: boolean; message?: string }>;
    signin: (credentials: {
      email: string;
      password: string;
    }) => Promise<{ success: boolean; verified?: boolean; message?: string }>;
    signout: () => Promise<string | void>;
    sendVerificationCode: (credentials: {
      email: string;
    }) => Promise<string | undefined>;
    verifyVerificationCode: (credentials: {
      email: string;
      providedCode: string;
    }) => Promise<boolean>;

    changePassword: (credentials: {
      oldPassword: string;
      newPassword: string;
    }) => Promise<string | undefined>;

    sendForgotPasswordCode: (credentials: {
      email: string;
    }) => Promise<string | undefined>;

    checkForgotPasswordCode: (credentials: {
      email: string;
      providedCode: string;
    }) => Promise<boolean>;

    resetPasswordWithCode: (credentials: {
      email: string;
      providedCode: string;
      newPassword: string;
      confirmPassword: string;
    }) => Promise<boolean>;
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
