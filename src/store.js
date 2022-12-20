import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./features/roomSlice";
import channelReducer from "./features/channelSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
    reducer: {
        channels: channelReducer,
        room: roomReducer,
        user: userReducer,
    },
});
