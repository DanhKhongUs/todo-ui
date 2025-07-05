import { useEffect, useState } from "react";
import * as authAPI from "../../services/authService";
import { toast } from "react-toastify";

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthCredentials {
  email: string;
  password: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        setIsLoading(true);

        const data = await authAPI.validate();

        if (data.success && data.user) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.warn("User not authenticated yet.");
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuth();
  }, []);

  const signup = async (
    credentials: SignUpCredentials
  ): Promise<string | undefined> => {
    try {
      const data = await authAPI.signup(credentials);

      if (!data.success) {
        toast.error(data.message || "Signup failed.");
        return data.message;
      }

      toast.success("SignUp successful. Please signin.");
      return data.user?._id;
    } catch (error: any) {
      console.error("SignUp error:", error);
      toast.error("Signup failed. Please try again.");
      return "Signup failed.";
    }
  };

  const signin = async (
    credentials: AuthCredentials
  ): Promise<string | undefined> => {
    try {
      const data = await authAPI.signin(credentials);

      if (!data.success) {
        toast.error(data.message || "Signin failed.");
        return data.message;
      }

      setIsAuthenticated(true);
      setUser(data.user);
      if (data.user) setUser(data.user);

      toast.success("SignIn successful");
    } catch (error: any) {
      console.error("SignIn error:", error);
      toast.error("Signin failed. Please try again.");
      return "Signin failed.";
    }
  };

  const signout = async (): Promise<string | void> => {
    try {
      const data = await authAPI.signout();

      if (!data.success) {
        toast.error(data.message || "Signout failed.");
        return data.message;
      }

      setIsAuthenticated(false);
      setUser(null);
      toast.success("SignOut successful.");
    } catch (error: any) {
      console.error("SignOut error:", error);
      toast.error("Signout failed. Please try again.");
      return "Signout failed.";
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    actions: { signup, signin, signout },
  };
};
