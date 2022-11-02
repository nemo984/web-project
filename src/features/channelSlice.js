import { createSlice } from "@reduxjs/toolkit";

export const channelSlice = createSlice({
    name: "channels",
    initialState: {
        loading: "idle",
        value: [
            // use thunk to fetch
            {
                name: "Web Programming",
                rooms: [{ name: "Default" }, { name: "AFK" }],
            },
            {
                name: "Artificial Unintelligent",
                rooms: [
                    { name: "Default" },
                    { name: "AFK" },
                    { name: "Freestyle" },
                ],
            },
            {
                name: "Advanced Wallpaper Design",
                rooms: [],
            },
            {
                name: "Shirt",
                rooms: [
                    {
                        name: "Default",
                    },
                ],
            },
        ],
    },
    reducers: {
        createChannel: (state, action) => {
            state.value.append(action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { createChannel } = channelSlice.actions;

export default channelSlice.reducer;
