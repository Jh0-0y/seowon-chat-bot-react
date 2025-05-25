import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { chatApi } from "@/modules/chat/chatApi";

// 비동기 액션: 메시지를 서버에 전송하고 응답 받기
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message, { rejectWithValue }) => {
    try {
      const response = await chatApi(message);
      return { from: "user", text: message, response };
    } catch (error) {
      return rejectWithValue("메시지 전송 실패");
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.messages.push({ type: "user", text: "...", temp: true });
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.pop(); // 임시 메시지 제거
        state.messages.push({ type: "user", text: action.payload.text });
        state.messages.push({ type: "bot", text: action.payload.response });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.messages.pop(); // 실패한 임시 메시지 제거
      });
  },
});

export default chatSlice.reducer;