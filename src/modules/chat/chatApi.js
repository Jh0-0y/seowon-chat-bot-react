import axios from "../shared/api/axiosInstance";

export const chatApi = async ({ message, sessionId }) => {
  const response = await axios.post("/chat", {
    chat: message,
    session_id: sessionId,
  });
  return response.data; // { response: "..." }
};

export const chatRoomCreateApi = async (title) => {
  const response = await axios.post("/session/create", { title });
  return {
    id: response.data.session_id,
    title: response.data.title,
  };
};

export const chatRoomListApi = async () => {
  const response = await axios.post("/session/list");
  return response.data; // [{ session_id, title, ended_at }]
};

export const chatHistoryApi = async (sessionId) => {
  const response = await axios.post("/session/read", { session_id: sessionId });
  return response.data; // [{ user_message, bot_response, created_at }]
};