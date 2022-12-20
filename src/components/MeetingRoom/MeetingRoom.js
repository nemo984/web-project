import { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "@livekit/react-components/dist/index.css";
import "react-aspect-ratio/aspect-ratio.css";
import Room from "./Room";

export const url = process.env.REACT_APP_LIVEKIT_URL;

const MeetingRoom = () => {
    const roomToken = useSelector((state) => state.room.roomToken);
    const isInRoom = useSelector((state) => state.room.loading);

    const handleFullScreen = useFullScreenHandle();

    return (
        <div className="h-screen w-full bg-slate-100 overflow-hidden">
            {isInRoom !== "idle" && (
                <FullScreen
                    handle={handleFullScreen}
                    className="h-full relative bg-slate-100"
                >
                    <div className="mt-5 h-5/6 w-full">
                        <RoomPage
                            token={roomToken} // stageRenderer renders the entire stage
                            handleFullScreen={handleFullScreen}
                        />
                    </div>
                </FullScreen>
            )}
        </div>
    );
};

export const RoomPage = ({ token, handleFullScreen }) => {
    const [room, setRoom] = useState(null);
    const audioInputDeviceId = useSelector(
        (state) => state.user.audioInputDeviceId
    );
    const audioOutputDeviceId = useSelector(
        (state) => state.user.audioOutputDeviceId
    );
    const videoInputDeviceId = useSelector(
        (state) => state.user.videoInputDeviceId
    );

    const isSwitchingRoom = useSelector((state) => state.room.switching);

    useEffect(() => {
        if (isSwitchingRoom && room !== null) {
            room.disconnect();
        }
    }, [isSwitchingRoom]);

    // change audio input
    useEffect(() => {
        if (audioInputDeviceId !== "" && room) {
            room.switchActiveDevice("audioinput", audioInputDeviceId);
        }
    }, [audioInputDeviceId]);

    // change audio output
    useEffect(() => {
        if (audioOutputDeviceId !== "" && room) {
            room.switchActiveDevice("audiooutput", audioOutputDeviceId);
        }
    }, [audioOutputDeviceId]);

    // change video
    useEffect(() => {
        if (videoInputDeviceId !== "" && room) {
            room.switchActiveDevice("videoinput", videoInputDeviceId);
        }
    }, [videoInputDeviceId]);

    async function onConnected(room) {
        await room.localParticipant.setCameraEnabled(false);
        await room.localParticipant.setMicrophoneEnabled(false);
        setRoom(room);
    }

    return (
        <Room
            token={token}
            handleFullScreen={handleFullScreen}
            onConnected={onConnected}
        />
    );
};

export default MeetingRoom;
