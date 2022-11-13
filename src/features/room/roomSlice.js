import { createSlice } from "@reduxjs/toolkit";

// mock
const names = require("./names.json");

const generateParticipants = () => {
    let participants = [];
    const used = new Set();

    for (let i = 0; i < Math.floor(Math.random() * 10 + 5); i++) {
        let randomI = Math.floor(Math.random() * names.length);
        if (used.has(randomI)) {
            randomI = Math.floor(Math.random() * names.length);
        } else {
            used.add(randomI);
            const randomParticipant = names[randomI];
            participants.push({
                fullName: randomParticipant.fullName,
                initials: randomParticipant.fullName
                    .match(/(\b\S)?/g)
                    .join("")
                    .match(/(^\S|\S$)?/g)
                    .join("")
                    .toUpperCase(),
            });
        }
    }
    return participants;
};

export const roomSlice = createSlice({
    name: "room",
    initialState: {
        loading: "idle",
        selectedRoomId: -1,
        isInRoom: false,
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
        },
        leaveRoom: (state) => {
            state.roomId = "";
            state.loading = "idle";
            state.selectedRoomId = -1;
            state.currentRoom = {};
            state.isInRoom = false;
        },
        changeRoom: (state) => {}, // leave room + join room
        shareScreen: (state) => {},
        kickParticipant: (state) => {},
    },
});

// Action creators are generated for each case reducer function
export const { joinRoom, leaveRoom } = roomSlice.actions;

export default roomSlice.reducer;
