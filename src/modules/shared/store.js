import { configureStore } from "@reduxjs/toolkit";
import authReducers from "@/modules/auth/authStore";
import chatReducers from "@/modules/chat/chatStore";

// 각 도메인(store)에서 export한 리듀서들을 하나로 통합하여 Redux store 생성
const store = configureStore({
  reducer: {
    ...authReducers, // login, register
    ...chatReducers, // chat 관련 상태
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;