import { useRef } from "react";
import { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useSelector, useDispatch } from "react-redux";
import { leaveRoom } from "./features/room/roomSlice";
import { useRoom, useParticipant } from "@livekit/react-core";
import { useEffect } from "react";

import "@livekit/react-components/dist/index.css";
import "react-aspect-ratio/aspect-ratio.css";
import { LiveKitRoom } from "@livekit/react-components";

const url = process.env.REACT_APP_LIVEKIT_URL;

const MeetingRoom = () => {
    const room = useSelector((state) => state.room.currentRoom);
    const roomToken = useSelector((state) => state.room.roomToken);
    const isInRoom = useSelector((state) => state.room.loading);

    const handleFullScreen = useFullScreenHandle();

    return (
        <div className="h-screen w-full bg-slate-100 overflow-hidden">
            {JSON.stringify(room)}
            {isInRoom !== "idle" && (
                <FullScreen
                    handle={handleFullScreen}
                    className="h-full relative"
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

const Participant = ({ participant, showAvatar, videoRef, me }) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div
            className={
                "m-2 h-64 w-80 bg-neutral flex items-center justify-center border-8 border-lime-400 rounded-3xl " +
                (me ? "absolute bottom-0 right-0" : "relative")
            }
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
        >
            {showAvatar ? (
                <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                        <span className="text-3xl">{participant.initials}</span>
                    </div>
                </div>
            ) : (
                <>
                    <video
                        className="w-full h-full"
                        id="video"
                        controls="controls"
                        preload="none"
                        ref={videoRef}
                    >
                        <source
                            id="mp4"
                            src="http://media.w3.org/2010/05/sintel/trailer.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <audio></audio>
                </>
            )}
            <div className="absolute bottom-4 left-3 text-secondary">
                {participant.fullName}
            </div>

            {isHovering && (
                <div className="absolute top-0 right-0">
                    <div className="dropdown dropdown-right">
                        <label tabIndex={0} className="btn m-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-dots cursor-pointer"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                color="white"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                ></path>
                                <circle cx="5" cy="12" r="1"></circle>
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="19" cy="12" r="1"></circle>
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a>Pin</a>
                            </li>
                            <li>
                                <a>Kick</a>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

const Footer = ({ handleFullScreen, room }) => {
    const dispatch = useDispatch();

    const toggleShareScreen = async () => {
        await room.localParticipant.setScreenShareEnabled(
            !room.localParticipant.isScreenShareEnabled
        );
    };

    const toggleMicrophone = async () => {
        console.log("trying to mute");
        await room.localParticipant.setMicrophoneEnabled(
            !room.localParticipant.isMicrophoneEnabled
        );
    };

    const toggleCamera = async () => {
        await room.localParticipant.setCameraEnabled(
            !room.localParticipant.isCameraEnabled
        );
    };

    const handleLeaveRoom = () => {
        room.disconnect();
        dispatch(leaveRoom());
    };

    return (
        <div className="flex justify-center mt-5 p-5 bg-slate-600 w-full h-full">
            <div className="btn-group">
                <button className="btn" onClick={toggleMicrophone}>
                    {room.localParticipant.isMicrophoneEnabled ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="swap-on fill-current icon icon-tabler icon-tabler-microphone"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            ></path>
                            <rect
                                x="9"
                                y="2"
                                width="6"
                                height="11"
                                rx="3"
                            ></rect>
                            <path d="M5 10a7 7 0 0 0 14 0"></path>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="swap-off fill-current icon icon-tabler icon-tabler-microphone-off"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            ></path>
                            <line x1="3" y1="3" x2="21" y2="21"></line>
                            <path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1"></path>
                            <path d="M5 10a7 7 0 0 0 10.846 5.85m2.002 -2a6.967 6.967 0 0 0 1.152 -3.85"></path>
                            <line x1="8" y1="21" x2="16" y2="21"></line>
                            <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                    )}
                </button>
                <button className="btn" onClick={toggleCamera}>
                    {room.localParticipant.isCameraEnabled ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="swap-on fill-current icon icon-tabler icon-tabler-video"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            ></path>
                            <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z"></path>
                            <rect
                                x="3"
                                y="6"
                                width="12"
                                height="12"
                                rx="2"
                            ></rect>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="swap-off fill-current icon icon-tabler icon-tabler-video-off"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            ></path>
                            <line x1="3" y1="3" x2="21" y2="21"></line>
                            <path d="M15 11v-1l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -.675 .946"></path>
                            <path d="M10 6h3a2 2 0 0 1 2 2v3m0 4v1a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h1"></path>
                        </svg>
                    )}
                </button>
                <button className="btn" onClick={toggleShareScreen}>
                    {!room.localParticipant.isScreenShareEnabled ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-screen-share"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            ></path>
                            <path d="M21 12v3a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1h9"></path>
                            <line x1="7" y1="20" x2="17" y2="20"></line>
                            <line x1="9" y1="16" x2="9" y2="20"></line>
                            <line x1="15" y1="16" x2="15" y2="20"></line>
                            <path d="M17 4h4v4"></path>
                            <path d="M16 9l5 -5"></path>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-screen-share-off"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            ></path>
                            <path d="M21 12v3a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1h9"></path>
                            <line x1="7" y1="20" x2="17" y2="20"></line>
                            <line x1="9" y1="16" x2="9" y2="20"></line>
                            <line x1="15" y1="16" x2="15" y2="20"></line>
                            <path d="M17 8l4 -4m-4 0l4 4"></path>
                        </svg>
                    )}
                </button>
                <button
                    className="btn"
                    onClick={() =>
                        !handleFullScreen.active
                            ? handleFullScreen.enter()
                            : handleFullScreen.exit()
                    }
                >
                    {!handleFullScreen.active ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-arrows-maximize"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            ></path>
                            <polyline points="16 4 20 4 20 8"></polyline>
                            <line x1="14" y1="10" x2="20" y2="4"></line>
                            <polyline points="8 20 4 20 4 16"></polyline>
                            <line x1="4" y1="20" x2="10" y2="14"></line>
                            <polyline points="16 20 20 20 20 16"></polyline>
                            <line x1="14" y1="14" x2="20" y2="20"></line>
                            <polyline points="8 4 4 4 4 8"></polyline>
                            <line x1="4" y1="4" x2="10" y2="10"></line>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-arrows-minimize"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            ></path>
                            <polyline points="5 9 9 9 9 5"></polyline>
                            <line x1="3" y1="3" x2="9" y2="9"></line>
                            <polyline points="5 15 9 15 9 19"></polyline>
                            <line x1="3" y1="21" x2="9" y2="15"></line>
                            <polyline points="19 9 15 9 15 5"></polyline>
                            <line x1="15" y1="9" x2="21" y2="3"></line>
                            <polyline points="19 15 15 15 15 19"></polyline>
                            <line x1="15" y1="15" x2="21" y2="21"></line>
                        </svg>
                    )}
                </button>
                <button className="btn bg-red-500" onClick={handleLeaveRoom}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-logout"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                        ></path>
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                        <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export const RoomPage = ({ token, handleFullScreen }) => {
    const audioInputDeviceId = useSelector(
        (state) => state.user.audioInputDeviceId
    );
    const audioOutputDeviceId = useSelector(
        (state) => state.user.audioOutputDeviceId
    );
    const videoInputDeviceId = useSelector(
        (state) => state.user.videoInputDeviceId
    );

    // change audio input
    useEffect(() => {
        if (audioInputDeviceId !== "") {
            //  room.localParticipant("audioinput", audioInputDeviceId);
            console.log(audioInputDeviceId);
        }
    }, [audioInputDeviceId]);

    // change audio output
    useEffect(() => {
        if (audioOutputDeviceId !== "") {
            //  room.localParticipant("audioutput", audioOutputDeviceId);
            console.log(audioOutputDeviceId);
        }
    }, [audioOutputDeviceId]);

    // change video
    useEffect(() => {
        if (videoInputDeviceId !== "") {
            //  room.localParticipant("videoinput", videoInputDeviceId);
            console.log(videoInputDeviceId);
        }
    }, [videoInputDeviceId]);

    async function onConnected(room) {
        await room.localParticipant.setCameraEnabled(true);
        await room.localParticipant.setMicrophoneEnabled(true);
    }

    return (
        <div className="roomContainer">
            <LiveKitRoom
                url={url}
                token={token}
                onConnected={onConnected}
                // controlRenderer renders the control bar
                controlRenderer={(props) => {
                    return (
                        <Footer
                            room={props.room}
                            handleFullScreen={handleFullScreen}
                        />
                    );
                }}
            />
        </div>
    );
};

export default MeetingRoom;
