import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import roomReducer from "./features/room/roomSlice";
import channelReducer from "./features/channelSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        channels: channelReducer,
        room: roomReducer,
    },
});
