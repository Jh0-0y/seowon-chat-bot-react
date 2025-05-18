import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "@/modules/api/testauth/TestAuth";

export const login = createAsyncThunk(
  "auth/login", //액션 명
  async (credentials, { rejectWithValue }) => {
    try {
      const { token } = await loginApi(credentials);
      localStorage.setItem("token", token);
      return token;
    } catch (err) {
      return rejectWithValue("서버에 문제가 발생했습니다");
    }
  }
);

const loginSlice = createSlice({
  //액션 생성
  name: "login",
  initialState: {
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token"),
    loading: false,
    error: "",
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null; //토큰 저장소
      state.isLoggedIn = false; //로그인 여부 저장소
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        //로그인 요청 시 에러 초기화
        state.loading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        //로그인 성공 시 토큰 저장, 로그인 상태 true
        state.token = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        //로그인 실패 시 에러 메시지 저장, 로그인 상태 false
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
