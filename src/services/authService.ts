import axios from "axios";
import httpRequest from "../utils/httpRequest";

interface Data {
  email: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
  newPassword?: string;
  providedCode?: string;
}

interface ChangePasswordData {
  oldPassword?: string;
  newPassword?: string;
}

export const validate = async () => {
  const { data } = await httpRequest.get("/auth/validate", {
    withCredentials: true,
  });
  return data;
};

export const signup = async (data: Data) => {
  return (
    await httpRequest.post("/auth/signup", data, { withCredentials: true })
  ).data;
};

export const signin = async (data: Data) => {
  const res = await httpRequest.post("/auth/signin", data, {
    withCredentials: true,
  });

  return res.data;
};

export const signout = async () => {
  const { data } = await httpRequest.post(
    "/auth/signout",
    {},
    { withCredentials: true }
  );

  return data;
};

export const sendVerificationCode = async (data: Data) => {
  return (
    await httpRequest.patch("/auth/send-verification-code", data, {
      withCredentials: true,
    })
  ).data;
};

export const verifyVerificationCode = async (data: Data) => {
  return (
    await httpRequest.patch("/auth/verify-verification-code", data, {
      withCredentials: true,
    })
  ).data;
};

export const changePassword = async (data: ChangePasswordData) => {
  return (
    await httpRequest.patch("/auth/change-password", data, {
      withCredentials: true,
    })
  ).data;
};

export const sendForgotPasswordCode = async (data: Data) => {
  return (
    await httpRequest.patch("/auth/send-forgot-password-code", data, {
      withCredentials: true,
    })
  ).data;
};

export const checkForgotPasswordCode = async (data: Data) => {
  return (
    await httpRequest.patch("/auth/check-forgot-password-code", data, {
      withCredentials: true,
    })
  ).data;
};

export const resetPasswordWithCode = async (data: Data) => {
  return (
    await httpRequest.patch("/auth/reset-password-with-code", data, {
      withCredentials: true,
    })
  ).data;
};
