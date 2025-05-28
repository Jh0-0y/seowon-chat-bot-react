import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { chatApi } from "@/modules/chat/chatApi";

// 비동기 액션 생성: 서버와의 통신을 처리하는 thunk
// createAsyncThunk는 비동기 작업을 처리하기 위한 Redux Toolkit의 유틸리티
export const sendMessage = createAsyncThunk(
  "chat/sendMessage", // 액션 타입
  async (message, { rejectWithValue }) => {
    try {
      // chatApi를 통해 서버에 메시지 전송
      const response = await chatApi(message);
      // 성공 시 서버 응답 반환
      return { response };
    } catch (error) {
      // 실패 시 에러 메시지와 함께 reject
      return rejectWithValue("메시지 전송 실패");
    }
  }
);

// 채팅 관련 상태를 관리하는 Redux slice
const chatSlice = createSlice({
  name: "chat", // slice의 이름
  // 초기 상태 정의
  initialState: {
    messages: [], // 채팅 메시지 배열
    loading: false, // 로딩 상태
    error: null, // 에러 상태
  },
  // 동기 액션 리듀서들
  reducers: {
    // 사용자 메시지를 즉시 UI에 추가하는 리듀서
    addUserMessage: (state, action) => {
      state.messages.push({ type: "user", text: action.payload });
    }
  },
  // 비동기 액션의 상태에 따른 리듀서들
  extraReducers: (builder) => {
    builder
      // 메시지 전송 시작 시
      .addCase(sendMessage.pending, (state) => {
        state.loading = true; // 로딩 상태 활성화
        state.error = null; // 에러 상태 초기화
      })
      // 메시지 전송 성공 시
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false; // 로딩 상태 비활성화
        // 봇의 응답 메시지를 메시지 배열에 추가
        state.messages.push({ type: "bot", text: action.payload.response });
      })
      // 메시지 전송 실패 시
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false; // 로딩 상태 비활성화
        state.error = action.payload; // 에러 메시지 저장
      });
  },
});

// 액션 생성자 내보내기
export const { addUserMessage } = chatSlice.actions;
// 리듀서 내보내기
export default chatSlice.reducer;