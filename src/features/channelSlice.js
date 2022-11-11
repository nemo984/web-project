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

// Action creators are generated for each case reducer function
export const { createChannelEvent } = channelSlice.actions;

export default channelSlice.reducer;
