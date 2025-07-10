import httpRequest from "../utils/httpRequest";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

interface VerificationData {
  email: string;
  providedCode: string;
}

interface SendVerificationData {
  email: string;
}

interface SendForgotPasswordData {
  email: string;
}

interface VerifyForgotPasswordData {
  email: string;
  providedCode: string;
  newPassword: string;
  confirmPassword: string;
}

export const validate = async () => {
  const token = localStorage.getItem("token");

  const { data } = await httpRequest.get("/auth/validate", {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const signup = async (data: SignUpData) => {
  return (
    await httpRequest.post("/auth/signup", data, { withCredentials: true })
  ).data;
};

export const signin = async (data: SignInData) => {
  const res = await httpRequest.post("/auth/signin", data, {
    withCredentials: true,
  });
  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }

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

export const sendVerificationCode = async (data: SendVerificationData) => {
  return (
    await httpRequest.patch("/auth/send-verification-code", data, {
      withCredentials: true,
    })
  ).data;
};

export const verifyVerificationCode = async (data: VerificationData) => {
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
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  ).data;
};

export const sendForgotPasswordCode = async (data: SendForgotPasswordData) => {
  return (
    await httpRequest.patch("auth/send-forgot-password-code", data, {
      withCredentials: true,
    })
  ).data;
};

export const verifyForgotPasswordCode = async (
  data: VerifyForgotPasswordData
) => {
  return (
    await httpRequest.patch("auth/verify-forgot-password-code", data, {
      withCredentials: true,
    })
  ).data;
};
