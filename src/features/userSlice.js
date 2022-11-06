import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        username: "John",
        audioInputDeviceId: "",
        audioOutputDeviceId: "",
        videoInputDeviceId: "",
        inputVolume: "",
        outputVolume: "",
    },
    reducers: {
        setAudioInputDeviceId: (state, action) => {
            state.audioInputDeviceId = action.payload;
        },
        setAudioOutputDeviceId: (state, action) => {
            state.audioOutputDeviceId = action.payload;
        },
        setVideoInputDeviceId: (state, action) => {
            state.videoInputDeviceId = action.payload;
        },
    },
});

export const {
    setAudioInputDeviceId,
    setAudioOutputDeviceId,
    setVideoInputDeviceId,
} = userSlice.actions;

export default userSlice.reducer;
