import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
    name: "room",
    initialState: {
        loading: "idle",
        selectedRoomId: -1,
        selectedRoomInCount: 0,
        isInRoom: false,
        switching: false,
        currentRoom: {},
        roomToken: "",
        id: "",
        participants: [],
        isScreenSharing: false,
    },
    reducers: {
        joinRoom: (state, action) => {
            const { token, room } = action.payload;
            state.roomToken = token ?? prompt("Access Token");
            state.selectedRoomId = room.id;
            state.currentRoom = room;
            state.loading = "joined";
            state.isInRoom = true;
            state.switching = false;
        },
        leaveRoom: (state) => {
            state.selectedRoomInCount =
                state.selectedRoomInCount > 0
                    ? state.selectedRoomInCount - 1
                    : 0;
            state.roomId = "";
            state.selectedRoomId = -1;
            state.loading = "idle";
            state.currentRoom = {};
            state.isInRoom = false;
        },
        setSelectedRoomInCount(state, action) {
            state.selectedRoomInCount = action.payload;
        },
        changeRoom: (state) => {
            state.switching = true;
        },
    },
});

export const { joinRoom, leaveRoom, setSelectedRoomInCount, changeRoom } =
    roomSlice.actions;

export default roomSlice.reducer;
