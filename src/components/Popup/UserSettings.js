import React, { useCallback, useEffect, useState } from "react";
import { Room } from "livekit-client";
import {
    setAudioInputDeviceId,
    setAudioOutputDeviceId,
    setVideoInputDeviceId,
} from "../../features/userSlice";
import { useDispatch } from "react-redux";
import "react-tabs/style/react-tabs.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Popup from "reactjs-popup";

const Settings = () => {
    const dispatch = useDispatch();

    const [audioInputDevices, setAudioInputDevices] = useState([]);
    const [audioOutputDevices, setAudioOutputDevices] = useState([]);
    const [videoInputDevices, setVideoInputDevices] = useState([]);

    const listAudioDevices = useCallback(async () => {
        const devices = await Room.getLocalDevices("audioinput");
        setAudioInputDevices(devices);
    }, []);

    const listAudioOutputDevices = useCallback(async () => {
        const devices = await Room.getLocalDevices("audiooutput");
        setAudioOutputDevices(devices);
    }, []);

    const listVideoDevices = useCallback(async () => {
        const devices = await Room.getLocalDevices("videoinput");
        setVideoInputDevices(devices);
    }, []);

    useEffect(() => {
        listAudioDevices();
        listAudioOutputDevices();
        listVideoDevices();
        navigator.mediaDevices.addEventListener("devicechange", () => {
            listAudioDevices();
            listAudioOutputDevices();
            listVideoDevices();
        });

        return () => {
            navigator.mediaDevices.removeEventListener("devicechange", () => {
                listAudioDevices();
                listAudioOutputDevices();
                listVideoDevices();
            });
        };
    }, []);

    return (
        <Popup
            trigger={<a>Settings</a>}
            contentStyle={{ borderRadius: "20px", maxWidth: "32rem" }}
            modal
        >
            <div className="w-full h-96 p-2">
                <div className="w-full p-0">
                    <Tabs>
                        <TabList>
                            <Tab>
                                <p>Audio</p>
                            </Tab>
                            <Tab>
                                <p>Video</p>
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <div className="panel-content">
                                <h3 className="font-bold text-lg">
                                    Input device
                                </h3>
                                <select
                                    className="select w-full max-w-xs"
                                    onChange={(e) =>
                                        dispatch(
                                            setAudioInputDeviceId(
                                                e.target.value
                                            )
                                        )
                                    }
                                >
                                    <option disabled selected>
                                        Pick your input device
                                    </option>
                                    {audioInputDevices.map((device, i) => (
                                        <option
                                            key={device.deviceId}
                                            selected={i === 0}
                                            value={device.deviceId}
                                        >
                                            {device.label}
                                        </option>
                                    ))}
                                </select>
                                <h3 className="font-bold text-lg">
                                    Output device
                                </h3>
                                <select
                                    className="select w-full max-w-xs"
                                    onChange={(e) =>
                                        dispatch(
                                            setAudioOutputDeviceId(
                                                e.target.value
                                            )
                                        )
                                    }
                                >
                                    <option disabled selected>
                                        Pick your output device
                                    </option>
                                    {audioOutputDevices.map((device, i) => (
                                        <option
                                            key={device.deviceId}
                                            selected={i === 0}
                                            value={device.deviceId}
                                        >
                                            {device.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <h3 className="font-bold text-lg">Camera</h3>
                            <select
                                className="select w-full max-w-xs"
                                onChange={(e) =>
                                    dispatch(
                                        setVideoInputDeviceId(e.target.value)
                                    )
                                }
                            >
                                <option disabled selected>
                                    Pick your camera
                                </option>
                                {videoInputDevices.map((device, i) => (
                                    <option
                                        key={device.deviceId}
                                        selected={i === 0}
                                        value={device.deviceId}
                                    >
                                        {device.label}
                                    </option>
                                ))}
                            </select>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </Popup>
    );
};

export default Settings;
