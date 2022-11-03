import React, { useEffect, useState } from "react";
import { Room } from "livekit-client";

const Settings = () => {
    const [audioInputDevices, setAudioInputDevices] = useState([]);
    const [audioOutputDevices, setAudioOutputDevices] = useState([]);
    const [videoInputDevices, setVideoInputDevices] = useState([]);

    useEffect(() => {
        Room.getLocalDevices("audioinput").then((value) => {
            setAudioInputDevices(value);
        });
        Room.getLocalDevices("audiooutput").then((value) => {
            setAudioOutputDevices(value);
            console.log(value);
        });
        Room.getLocalDevices("videoinput").then((value) => {
            setVideoInputDevices(value);
        });
    }, []);

    return (
        <>
            <input type="checkbox" id="my-setting" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-4xl text-lg">Setting</h3>
                    <h3 className="font-bold text-lg">Input device</h3>
                    <select className="select w-full max-w-xs">
                        <option disabled selected>
                            Pick your input device
                        </option>
                        {audioInputDevices.map((device, i) => (
                            <option key={i} selected={i === 0}>
                                {device.label}
                            </option>
                        ))}
                    </select>
                    <h3 className="font-bold text-lg">Output device</h3>
                    <select className="select w-full max-w-xs">
                        <option disabled selected>
                            Pick your output device
                        </option>
                        {audioOutputDevices.map((device, i) => (
                            <option key={i} selected={i === 0}>
                                {device.label}
                            </option>
                        ))}
                    </select>
                    <h3 className="font-bold text-lg">Input volume</h3>
                    <input type="range" min="0" max="100" className="range" />
                    <h3 className="font-bold text-lg">Output volume</h3>
                    <input type="range" min="0" max="100" className="range" />
                    <h3 className="font-bold text-lg">Camera</h3>
                    <select className="select w-full max-w-xs">
                        <option disabled selected>
                            Pick your camera
                        </option>
                        {videoInputDevices.map((device, i) => (
                            <option key={i} selected={i === 0}>
                                {device.label}
                            </option>
                        ))}
                    </select>
                    <h3 className="font-bold text-lg">Virtual background</h3>
                    <select className="select w-full max-w-xs">
                        <option disabled selected>
                            Pick your camera
                        </option>
                        <option>Default</option>
                        <option>1</option>
                        <option>2</option>
                    </select>
                    <div className="modal-action">
                        <label htmlFor="my-setting" className="btn">
                            Close
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
