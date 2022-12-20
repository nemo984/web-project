import { createSlice } from "@reduxjs/toolkit";

export const channelSlice = createSlice({
    name: "channels",
    initialState: {
        loading: "idle",
    },
    reducers: {
        createChannelEvent: (state, action) => {
            state.loading = "creating";
        },
    },
});

export const { createChannelEvent } = channelSlice.actions;

export default channelSlice.reducer;
