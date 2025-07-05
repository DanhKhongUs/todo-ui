import httpRequest from "../utils/httpRequest";

export const validate = async () => {
  const { data } = await httpRequest.get("/auth/validate");
  return data;
};

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  return (await httpRequest.post("/auth/signup", data)).data;
};

export const signin = async (data: { email: string; password: string }) => {
  return (await httpRequest.post("/auth/signin", data)).data;
};

export const signout = async () => {
  const { data } = await httpRequest.post("/auth/signout");
  return data;
};
