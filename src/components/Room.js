import { Client, LocalStream } from "ion-sdk-js";
import { IonSFUJSONRPCSignal } from "ion-sdk-js/lib/signal/json-rpc-impl";
import { useEffect, useRef, useState } from "react";

import React from "react";

let client, signal;

const config = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
    ],
};

const Room = () => {
    const [remoteStream, setRemoteStream] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [pubShow, setPubShow] = useState("hidden");
    const pubVideo = useRef();
    const remoteVideoRef = useRef([]);

    useEffect(() => {
        signal = new IonSFUJSONRPCSignal("ws://localhost:7000/ws");
        client = new Client(signal, config);
        signal.onopen = () => client.join("test room");

        client.ontrack = (track, stream) => {
            console.log("got track: ", track.id, "for stream: ", stream.id);
            if (track.kind === "video") {
                track.onunmute = () => {
                    setRemoteStream((remoteStream) => [
                        ...remoteStream,
                        { id: track.id, stream: stream },
                    ]);
                    setCurrentVideo(track.id);

                    stream.onremovetrack = (e) => {
                        setRemoteStream((remoteStream) =>
                            remoteStream.filter(
                                (item) => item.id !== e.track.id
                            )
                        );
                    };
                };
            }
        };
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
                <div>ion-sfu</div>
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

export default Room;
