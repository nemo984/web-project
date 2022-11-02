import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
    name: "room",
    initialState: {
        loading: "idle",
        name: "",
        id: "",
        participants: [],
        isScreenSharing: false,
    },
    reducers: {
        joinRoom: (state, action) => {
            state.name = action.payload;
            state.loading = "joined";
        },
        leaveRoom: (state) => {
            state.name = "";
            state.loading = "idle";
        },
        changeRoom: (state) => {}, // leave room + join room
        shareScreen: (state) => {},
        kickParticipant: (state) => {},
    },
});

// Action creators are generated for each case reducer function
export const { joinRoom, leaveRoom } = roomSlice.actions;

export default roomSlice.reducer;
