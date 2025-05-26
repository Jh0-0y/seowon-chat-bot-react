import axios from "../shared/api/axiosInstance";

export const chatApi = async (message) => {
  const response = await axios.post('/chat', { chat : message});
  return response.data;
};