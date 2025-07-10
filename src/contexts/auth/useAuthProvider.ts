import { useEffect, useState } from "react";
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

interface ChangePasswordCredentials {
  oldPassword: string;
  newPassword: string;
}

interface SendVerificationCodeCredentials {
  email: string;
}

interface VerifyVerificationCodeCredentials {
  email: string;
  providedCode: string;
}

interface SendForgotPasswordCredentials {
  email: string;
}

interface VerifyForgotPasswordCredentials {
  email: string;
  providedCode: string;
  newPassword: string;
  confirmPassword: string;
}

// === Hook useAuthProvider ===

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Validate user on initial load
  useEffect(() => {
    const fetchAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

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

  const signup = async (
    credentials: SignUpCredentials
  ): Promise<{ success: boolean; message?: string }> => {
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

  const signin = async (
    credentials: AuthCredentials
  ): Promise<{ success: boolean; verified?: boolean; message?: string }> => {
    try {
      const data: APIResponse<User> = await authAPI.signin(credentials);

      if (!data.success) {
        toast.error(data.message || "Signin failed.");
        return { success: false, message: data.message || "Signin failed." };
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
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

  const signout = async (): Promise<string | void> => {
    try {
      const data: APIResponse<User> = await authAPI.signout();

      if (!data.success) {
        toast.error(data.message || "Signout failed.");
        return data.message;
      }

      setIsAuthenticated(false);
      setUser(null);
      toast.success("SignOut successful.");
    } catch (error) {
      console.error("SignOut error:", error);
      toast.error("Signout failed. Please try again.");
      return "Signout failed.";
    }
  };

  const sendVerificationCode = async (
    credentials: SendVerificationCodeCredentials
  ): Promise<string | undefined> => {
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

  const verifyVerificationCode = async (
    credentials: VerifyVerificationCodeCredentials
  ): Promise<boolean> => {
    try {
      const data: APIResponse<User> = await authAPI.verifyVerificationCode(
        credentials
      );

      if (!data.success) {
        toast.error(data.message || "Verification code failed.");
        return false;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
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

  const changePassword = async (
    credentials: ChangePasswordCredentials
  ): Promise<string | undefined> => {
    try {
      const data: APIResponse<User> = await authAPI.changePassword(credentials);

      if (!data.success) {
        toast.error(data.message || "Change password failed.");
        return data.message;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
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

  const sendForgotPasswordCode = async (
    credentials: SendForgotPasswordCredentials
  ): Promise<string | undefined> => {
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

  const verifyForgotPasswordCode = async (
    credentials: VerifyForgotPasswordCredentials
  ): Promise<boolean> => {
    const { newPassword, confirmPassword } = credentials;

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return false;
    }

    try {
      const data: APIResponse<User> = await authAPI.verifyForgotPasswordCode(
        credentials
      );
      if (!data.success) {
        return false;
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      const validated = await authAPI.validate();
      if (validated.success && validated.user) {
        setUser(validated.user);
      }
      setIsAuthenticated(true);
      toast.success("Password updated successfully.");
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
      verifyForgotPasswordCode,
    },
  };
};
