import TestAxiosInstance from "./TestAxiosInstance";

const axios = TestAxiosInstance();

export const loginApi = async ({ user_id, user_password }) => {
  const response = await axios.post("/auth/login", {
    user_id,
    user_password,
  });
  return response.data;
};

export const registerApi = async (data) => {
  const response = await axios.post('/auth/register', data);
  return response.data;
};