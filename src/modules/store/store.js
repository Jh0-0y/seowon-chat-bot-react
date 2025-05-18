import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import registerReducer from "./slices/registerSlice"

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
  },
});

export default store;
