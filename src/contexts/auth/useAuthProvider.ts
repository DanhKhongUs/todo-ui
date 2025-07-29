import { useEffect, useRef, useState } from "react";
import * as authAPI from "../../services/authService";
import { toast } from "react-toastify";

// === Interfaces ===

interface APIResponse<T> {
  success: boolean;
  message?: string;
  user?: T;
  token?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  verified?: boolean;
}

interface Credentials {
  email: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
  newPassword?: string;
  providedCode?: string;
}

interface ChangePasswordCredentials {
  oldPassword: string;
  newPassword: string;
}

// === Hook useAuthProvider ===

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const justSignedOut = useRef(false);
  // Validate user on initial load
  useEffect(() => {
    // Nếu signout thì bỏ qua validate

    if (justSignedOut.current) {
      justSignedOut.current = false;
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return;
    }

    const fetchAuth = async () => {
      try {
        setIsLoading(true);
        const data: APIResponse<User> = await authAPI.validate();

        if (data.success && data.user) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("User not authenticated.");
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuth();
  }, []);

  const validate = async (): Promise<User | null> => {
    try {
      setIsLoading(true);
      const data: APIResponse<User> = await authAPI.validate();
      if (data.success && data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
        return data.user;
      } else {
        setUser(null);
        setIsAuthenticated(false);
        return null;
      }
    } catch (error) {
      console.error("Validate failed: ", error);
      setUser(null);
      setIsAuthenticated(false);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (credentials: Credentials) => {
    try {
      const data: APIResponse<User> = await authAPI.signup(credentials);

      if (!data.success) {
        toast.error(data.message || "Signup failed.");
        return { success: false, message: data.message || "Signup failed." };
      }

      toast.success("SignUp successful. Please signin.");
      return { success: true };
    } catch (error) {
      console.error("SignUp error:", error);
      toast.error("Signup failed. Please try again.");
      return { success: false, message: "Signup failed. Please try again." };
    }
  };

  const signin = async (credentials: Credentials) => {
    try {
      const data: APIResponse<User> = await authAPI.signin(credentials);

      if (!data.success) {
        toast.error(data.message || "Signin failed.");
        return { success: false, message: data.message || "Signin failed." };
      }

      // Gọi validate sau khi đăng nhập để lấy user chuẩn nhất
      const validated = await authAPI.validate();
      if (validated.success && validated.user) {
        setUser(validated.user);
        setIsAuthenticated(true);
        toast.success("SignIn successful");
        return { success: true, verified: validated.user.verified };
      }

      return { success: false, message: "Failed to validate user." };
    } catch (error) {
      console.error("SignIn error:", error);
      toast.error("Signin failed. Please try again.");
      return { success: false, message: "Signin failed. Please try again." };
    }
  };

  const signout = async () => {
    try {
      const data: APIResponse<User> = await authAPI.signout();

      if (!data.success) {
        toast.error(data.message || "Signout failed.");
        return data.message;
      }

      justSignedOut.current = true; // Đánh giấu vừa signout
      setIsAuthenticated(false);
      setUser(null);
      toast.success("SignOut successful.");
    } catch (error) {
      console.error("SignOut error:", error);
      toast.error("Signout failed. Please try again.");
      return "Signout failed.";
    }
  };

  const sendVerificationCode = async (credentials: Credentials) => {
    try {
      const data: APIResponse<User> = await authAPI.sendVerificationCode(
        credentials
      );

      if (!data.success) {
        return data.message;
      }

      setIsAuthenticated(true);
      if (data.user) setUser(data.user);
      toast.success("Verification code sent successfully.");
      return;
    } catch (error) {
      console.error("Send Verification Code Error: ", error);
    }
  };

  const verifyVerificationCode = async (credentials: Credentials) => {
    try {
      const data: APIResponse<User> = await authAPI.verifyVerificationCode(
        credentials
      );

      if (!data.success) {
        toast.error(data.message || "Verification code failed.");
        return false;
      }

      const validated = await authAPI.validate();
      if (validated.success && validated.user) {
        setUser(validated.user);
      }

      setIsAuthenticated(true);
      toast.success("Verification successful.");
      return true;
    } catch (error) {
      console.error("Verify Verification Code Error: ", error);
      toast.error("Verification failed. Please try again.");
      return false;
    }
  };

  const changePassword = async (credentials: ChangePasswordCredentials) => {
    try {
      const data: APIResponse<User> = await authAPI.changePassword(credentials);

      if (!data.success) {
        toast.error(data.message || "Change password failed.");
        return data.message;
      }

      const validated = await authAPI.validate();
      if (validated.success && validated.user) {
        setUser(validated.user);
        setIsAuthenticated(true);
      }

      setIsAuthenticated(true);
      if (data.user) setUser(data.user);

      toast.success("Password changed successfully.");
      return;
    } catch (error) {
      console.error("Change Password Error: ", error);
      toast.error("Change password failed. Please try again.");
      return "Change password failed.";
    }
  };

  const sendForgotPasswordCode = async (credentials: Credentials) => {
    try {
      const data: APIResponse<User> = await authAPI.sendForgotPasswordCode(
        credentials
      );

      if (!data.success) {
        return data.message;
      }

      if (data.user) setUser(data.user);

      toast.success("Forgot password code sent successfully.");
      return;
    } catch (error) {
      console.error("Send Forgot Password Code Error: ", error);
    }
  };

  const checkForgotPasswordCode = async (credentials: Credentials) => {
    try {
      const data: APIResponse<User> = await authAPI.checkForgotPasswordCode(
        credentials
      );
      if (!data.success) return false;

      return true;
    } catch (error) {
      console.error("Check Forgot Password Code Error:", error);
      return false;
    }
  };

  const resetPasswordWithCode = async (credentials: Credentials) => {
    const { newPassword, confirmPassword } = credentials;

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return false;
    }

    try {
      const data: APIResponse<User> = await authAPI.resetPasswordWithCode(
        credentials
      );
      if (!data.success) {
        return false;
      }

      return true;
    } catch (error) {
      console.error("Verify Forgot Password Code Error:", error);
      return false;
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    actions: {
      validate,
      signup,
      signin,
      signout,
      sendVerificationCode,
      verifyVerificationCode,
      changePassword,
      sendForgotPasswordCode,
      checkForgotPasswordCode,
      resetPasswordWithCode,
    },
  };
};
