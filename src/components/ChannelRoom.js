import { Client, LocalStream } from "ion-sdk-js";
import { IonSFUJSONRPCSignal } from "ion-sdk-js/lib/signal/json-rpc-impl";
import { useEffect, useRef, useState } from "react";
import {
    connect,
    Room,
    RoomEvent,
    RemoteParticipant,
    RemoteTrackPublication,
    RemoteTrack,
    Participant,
    VideoPresets,
} from "livekit-client";
import React from "react";


const config = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
    ],
};

const room = new Room({
    // automatically manage subscribed video quality
    adaptiveStream: true,

    // optimize publishing bandwidth and CPU for published tracks
    dynacast: true,

    // default capture settings
    videoCaptureDefaults: {
        resolution: VideoPresets.h720.resolution,
    },
});

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjY0MjEzNTksImlzcyI6ImRldmtleSIsIm5hbWUiOiJ1c2VyMSIsIm5iZiI6MTY2NjMzNDk1OSwic3ViIjoidXNlcjEiLCJ2aWRlbyI6eyJyb29tIjoibXktZmlyc3Qtcm9vbSIsInJvb21Kb2luIjp0cnVlfX0.ijIzKqrF7BG0me5B97O6b3ZUhkXriBf6qLhlK3SEONI";

const ChannelRoom = () => {
    const [remoteStream, setRemoteStream] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [pubShow, setPubShow] = useState("hidden");
    const pubVideo = useRef();
    const remoteVideoRef = useRef([]);

    useEffect(() => {
        const handleTrackSubscribed = (track, publication, participant) => {
            console.log(track, publication, participant);
        };

        const handleTrackUnsubscribed = () => {};

        const handleActiveSpeakerChange = () => {};

        const handleDisconnect = () => {};

        const handleLocalTrackUnpublished = () => {};

        // set up event listeners
        room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed)
            .on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
            .on(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakerChange)
            .on(RoomEvent.Disconnected, handleDisconnect)
            .on(RoomEvent.LocalTrackUnpublished, handleLocalTrackUnpublished);

        const connectRoom = async () => {
            await room.connect("ws://localhost:7800", token);
            console.log("connected to room", room.name);
            // publish local camera and mic tracks
            await room.localParticipant.enableCameraAndMicrophone();
        };

        connectRoom().catch(console.error);
    }, []);

    useEffect(() => {
        const videoEl = remoteVideoRef.current[currentVideo];
        remoteStream.forEach((event) => {
            if (event.id === currentVideo) {
                videoEl.srcObject = event.stream;
            }
        });
    }, [currentVideo]);

    const start = (event) => {
        if (event) {
            LocalStream.getUserMedia({
                resolution: "vga",
                audio: true,
                codec: "vp8",
            })
                .then((media) => {
                    pubVideo.current.srcObject = media;
                    pubVideo.current.autoplay = true;
                    pubVideo.current.muted = false;
                    pubVideo.current.controls = true;

                    setPubShow("block");
                    client.publish(media);
                })
                .catch(console.error);
        } else {
            LocalStream.getDisplayMedia({
                resolution: "vga",
                video: true,
                audio: true,
                codec: "vp8",
            })
                .then((media) => {
                    pubVideo.current.srcObject = media;
                    pubVideo.current.autoplay = true;
                    pubVideo.current.muted = false;
                    pubVideo.current.controls = true;

                    setPubShow("block");
                    client.publish(media);
                })
                .catch(console.error);
        }
    };

    return (
        <div>
            <header className="flex h-16 justify-center items-center text-xl bg-black text-white">
                <div className="absolute top-2  right-5">
                    <button
                        id="bnt_pubcam"
                        className="bg-blue-500 px-4 py-2 text-white rounded-lg mr-5"
                        onClick={() => start(true)}
                    >
                        Publish Camera
                    </button>
                    <button
                        id="bnt_pubscreen"
                        className="bg-green-500 px-4 py-2 text-white rounded-lg"
                        onClick={() => start(false)}
                    >
                        Publish Screen
                    </button>
                </div>
            </header>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
                <video
                    className={`bg-black h-full w-full ${pubShow}`}
                    controls
                    ref={pubVideo}
                ></video>
                {remoteStream.map((val, index) => (
                    <video
                        key={index}
                        ref={(el) => (remoteVideoRef.current[val.id] = el)}
                        className="bg-black w-full h-full"
                        controls
                    ></video>
                ))}
            </div>
        </div>
    );
};

export default ChannelRoom;
