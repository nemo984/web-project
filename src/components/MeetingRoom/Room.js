import { useDispatch } from "react-redux";
import { leaveRoom, setSelectedRoomInCount } from "../../features/roomSlice";
import { LiveKitRoom } from "@livekit/react-components";
import ControlBar from "./ControlBar";
import { url } from "./MeetingRoom";

const Room = ({ token, handleFullScreen, onConnected }) => {
    const dispatch = useDispatch();

    return (
        <LiveKitRoom
            url={url}
            token={token}
            onConnected={(room) => {
                onConnected(room);
                // size not including local participant
                dispatch(setSelectedRoomInCount(room.participants.size + 1));
                room.addListener("participantConnected", () => {
                    dispatch(
                        setSelectedRoomInCount(room.participants.size + 1)
                    );
                });
                room.addListener("participantDisconnected", () =>
                    dispatch(setSelectedRoomInCount(room.participants.size + 1))
                );
                room.addListener("disconnected", () => {
                    dispatch(leaveRoom());
                });
            }}
            // controlRenderer renders the control bar
            controlRenderer={(props) => {
                return (
                    <ControlBar
                        room={props.room}
                        handleFullScreen={handleFullScreen}
                    />
                );
            }}
        />
    );
};

export default Room;
