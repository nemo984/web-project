import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import CreateChannel from "../Popup/CreateChannel";
import { useInterval } from "../../hooks/useInterval";
import "./drawer.css";
import Channel from "./Channel";
import Profile from "./Profile";

const Sidebar = () => {
    const [isInFocus, setIsInFocus] = useState(true);
    const [channels, setChannels] = useState([]);

    const addChannel = (channel) => {
        setChannels((prevState) => [...prevState, channel]);
    };

    const removeChannel = (channelId) => {
        setChannels((channels) => channels.filter((c) => c.id !== channelId));
    };

    const editChannel = (channel) => {
        setChannels((channels) =>
            channels.map((ch) => {
                if (ch.id === channel.id) {
                    return channel;
                }
                return ch;
            })
        );
    };

    const getChannels = () => {
        axiosInstance.get("/me/channels/").then((res) => setChannels(res.data));
    };

    useInterval(() => {
        if (isInFocus) {
            getChannels();
        }
    }, 10000);

    useEffect(() => {
        getChannels();
        window.addEventListener("focus", () => setIsInFocus(true));
        window.addEventListener("blur", () => setIsInFocus(false));

        return () => {
            window.removeEventListener("focus", () => setIsInFocus(true));
            window.removeEventListener("blur", () => setIsInFocus(false));
        };
    }, []);

    return (
        <>
            <div className="drawer">
                <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle hidden"
                    defaultChecked={true}
                />
                <div className="drawer-content">
                    <label
                        htmlFor="my-drawer"
                        className="btn btn-primary drawer-button"
                    >
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer"
                        className="drawer-overlay"
                    ></label>
                    <ul
                        className="menu p-4 overflow-y-auto scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 
text-base-content bg-cyan-800 flex flex-col justify-between overflow-x-hidden"
                    >
                        <div className="mt-2">
                            <div>
                                <Profile />
                            </div>
                            {channels.map((channel) => (
                                <Channel
                                    key={channel.id}
                                    channel={channel}
                                    removeChannel={removeChannel}
                                    editChannel={editChannel}
                                />
                            ))}
                            <CreateChannel addChannel={addChannel} />
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
};

export function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
}
export default Sidebar;
