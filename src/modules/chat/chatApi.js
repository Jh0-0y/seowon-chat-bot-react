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
  const response = await axios.get(`/session/${sessionId}`);
  return response.data; // [{ user_message, bot_response, created_at }]
};

export const chatRoomDeleteApi = async (sessionId) => {
  const response = await axios.delete(`/session/${sessionId}`);
  return response.data;
};

export const chatRoomUpdateApi = async (sessionId, newTitle) => {
  const response = await axios.put(`/session/${sessionId}`, {
    update_title: newTitle,
  });
  return response.data;
};