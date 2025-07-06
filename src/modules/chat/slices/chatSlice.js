import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  chatApi,
  chatRoomListApi,
  chatHistoryApi,
  chatRoomDeleteApi,
  chatRoomUpdateApi,
} from "@/modules/chat/chatApi";
import { saveChatState } from "@/modules/shared/utils/localStorage";

export const fetchRoomList = createAsyncThunk(
  "chat/fetchRoomList",
  async () => {
    const rooms = await chatRoomListApi();
    return rooms || [];
  }
);

export const fetchChatHistory = createAsyncThunk(
  "chat/fetchChatHistory",
  async (sessionId) => {
    const history = await chatHistoryApi(sessionId);
    return { sessionId, history };
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (message, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const sessionId = state.chat.selectedRoomId;
      const response = await chatApi({ message, sessionId });
      return { response };
    } catch (error) {
      return rejectWithValue("메시지 전송 실패");
    }
  }
);

export const deleteChatRoom = createAsyncThunk(
  "chat/deleteRoom",
  async (sessionId) => {
    await chatRoomDeleteApi(sessionId);
    return sessionId;
  }
);

export const updateChatRoomTitle = createAsyncThunk(
  "chat/updateRoomTitle",
  async ({ sessionId, newTitle }) => {
    await chatRoomUpdateApi(sessionId, newTitle);
    return { sessionId, newTitle };
  }
);

const initialState = {
  selectedRoomId: null,
  rooms: [],
  messages: {},
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    selectedRoomId: null,
    rooms: [],
    messages: {},
    loading: false,
    error: null,
  },
  reducers: {
    selectRoom: (state, action) => {
      const roomId = action.payload;
      state.selectedRoomId = roomId;
      if (!state.messages[roomId]) {
        state.messages[roomId] = [
          {
            type: "bot",
            text: `안녕하세요! [${
              state.rooms.find((r) => r.id === roomId)?.title || "NewChat"
            }] 입니다.`,
          },
        ];
      }
    },
    addUserMessage: (state, action) => {
      const roomId = state.selectedRoomId;
      if (roomId) {
        if (!state.messages[roomId]) {
          state.messages[roomId] = [];
        }
        state.messages[roomId].push({ type: "user", text: action.payload });
        saveChatState(current(state));
      }
    },
    addRoom: (state, action) => {
      const { id, title } = action.payload;
      if (!state.rooms.find((room) => room.id === id)) {
        state.rooms.push({ id, title });
      }
      if (!state.messages[id]) {
        state.messages[id] = [
          { type: "bot", text: `안녕하세요! [${title || "NewChat"}] 입니다.` },
        ];
      }
      state.selectedRoomId = id;
      saveChatState(current(state));
    },
    resetChat: (state) => {
      Object.assign(state, initialState);
      saveChatState(initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        const roomId = state.selectedRoomId;
        if (roomId) {
          if (!state.messages[roomId]) {
            state.messages[roomId] = [];
          }
          state.messages[roomId].push({
            type: "bot",
            text: action.payload.response,
          });
          saveChatState(current(state));
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRoomList.fulfilled, (state, action) => {
        const fetchedRooms = action.payload || [];
        const newRooms = [];
        fetchedRooms.forEach((room) => {
          const id = String(room.session_id);
          const title = room.title;
          newRooms.push({ id, title, endedAt: room.ended_at });
          if (!state.messages[id]) {
            state.messages[id] = [
              { type: "bot", text: `안녕하세요! [${title}] 입니다.` },
            ];
          }
        });
        state.rooms = newRooms;
        saveChatState(current(state));
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        const { sessionId, history } = action.payload;
        state.messages[sessionId] = [];
        history.forEach((item) => {
          state.messages[sessionId].push({
            type: "user",
            text: item.user_message,
          });
          state.messages[sessionId].push({
            type: "bot",
            text: item.bot_response,
          });
        });
        saveChatState(current(state));
      })
      .addCase(deleteChatRoom.fulfilled, (state, action) => {
        const sessionId = String(action.payload);
        state.rooms = state.rooms.filter((room) => room.id !== sessionId);
        delete state.messages[sessionId];
        if (state.selectedRoomId === sessionId) {
          state.selectedRoomId = null;
        }
        saveChatState(current(state));
      })
      .addCase(updateChatRoomTitle.fulfilled, (state, action) => {
        const { sessionId, newTitle } = action.payload;
        const room = state.rooms.find((r) => r.id === sessionId);
        if (room) {
          room.title = newTitle;
        }
        saveChatState(current(state));
      });
  },
});

export const { selectRoom, addUserMessage, addRoom, resetChat } =
  chatSlice.actions;
export default chatSlice.reducer;
