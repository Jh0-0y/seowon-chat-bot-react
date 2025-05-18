import axios from "@/modules/api/testauth/TestAxiosInstance.js";

export const sendChatMessage = async (chat) => {
  try {
    const response = await axios.post("/chat", { chat });
    return response.data.answer || "답변을 불러오는 중입니다.";
  } catch (error) {
    console.error("Chat API Error:", error);
    throw new Error("⚠️ 서버와의 연결이 원활하지 않습니다.");
  }
};
