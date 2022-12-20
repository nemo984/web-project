import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRoom, joinRoom, leaveRoom } from "../../features/roomSlice";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import axios from "axios";
import CreateChannel from "../Popup/CreateChannel";
import { Collapse } from "react-collapse";
import ToolTip from "../common/ToolTip";
import CreateRoom from "../Popup/CreateRoom";
import ChannelSettings from "../Popup/ChannelSettings";
import { useInterval } from "../../hooks/useInterval";
import UserSettings from "../Popup/UserSettings";
import "./drawer.css";

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
                        <div className="mt-5">
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

//TODO: put components into each js file
const Profile = () => {
    // call api without google
    const [userInfo, setUserInfo] = useState({});

    const getProfile = async () => {
        const userInfo = await axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "google_access_token"
                    )}`,
                },
            })
            .then((res) => res.data);
        setUserInfo(userInfo);
    };

    useEffect(() => {
        localStorage.getItem("google_access_token") && getProfile();
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        // move later
        localStorage.clear();
        googleLogout();
        navigate("/login");
    };

    return (
        <div className="dropdown mb-3 flex">
            <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar h-full ring ring-primary ring-offset-base-100 ring-offset-2"
            >
                <div className="w-16 rounded-full">
                    <img
                        src={userInfo?.picture}
                        alt="profile pic"
                        referrerPolicy="no-referrer"
                        className="h-full w-full"
                    />
                </div>
            </label>
            <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
                <li>
                    <UserSettings />
                </li>
                <li onClick={handleLogout}>
                    <a>Logout</a>
                </li>
            </ul>
            <div className="ml-5 mt-2 text-xl text-secondary">
                {userInfo?.name}
            </div>
        </div>
    );
};

const Channel = ({ channel, removeChannel, editChannel }) => {
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);
    const [rooms, setRooms] = useState([]);
    const selectedRoomId = useSelector((state) => state.room.selectedRoomId);

    const addRoom = (room) => {
        setRooms((prevState) => [...prevState, room]);
    };

    useEffect(() => {
        if (channel?.rooms) {
            setRooms(channel.rooms);
        }
    }, [channel]);

    return (
        <div className="text-secondary font-light mb-3 text-ellipsis">
            <div className="flex justify-between items-center">
                <div
                    className="cursor-pointer text-xl font-medium bg-transparent w-full"
                    onClick={() => setIsCollapseOpen((prevState) => !prevState)}
                >
                    <div className="inline-block"></div>
                    {!isCollapseOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-chevron-down inline-block mr-3"
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
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-chevron-up inline-block mr-3"
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
                            <polyline points="6 15 12 9 18 15"></polyline>
                        </svg>
                    )}
                    {channel.name}
                </div>
                <ToolTip text="Settings">
                    <ChannelSettings
                        channel={channel}
                        removeChannel={removeChannel}
                        editChannel={editChannel}
                    />
                </ToolTip>

                <ToolTip text="Create Room">
                    <CreateRoom channelId={channel.id} addRoom={addRoom} />
                </ToolTip>
            </div>
            <div className="ml-5">
                <Collapse isOpened={isCollapseOpen}>
                    {rooms.map((room) => (
                        <Room
                            key={room.id}
                            room={room}
                            isSelected={selectedRoomId === room.id}
                        />
                    ))}
                </Collapse>
            </div>
        </div>
    );
};

function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
}

const Room = ({ room, isSelected }) => {
    const selectedInRoomCount = useSelector(
        (state) => state.room.selectedRoomInCount
    );
    const selectedRoomId = useSelector((state) => state.room.selectedRoomId);

    const getRoomToken = async () => {
        if (roomToken === "") {
            const res = await axiosInstance.get(
                `/channels/${room.channel}/rooms/${room.id}/token`
            );
            const token = res.data.token;
            setRoomToken(token);
            return token;
        }
        return roomToken;
    };
    const [roomToken, setRoomToken] = useState("");
    const dispatch = useDispatch();

    return (
        <li
            onClick={() => {
                if (selectedRoomId === room.id) {
                    return;
                }
                if (selectedRoomId !== -1) {
                    dispatch(changeRoom());
                }
                getRoomToken().then((token) => {
                    dispatch(leaveRoom());
                    timeout(200).then(() =>
                        dispatch(joinRoom({ token, room }))
                    );
                });
            }}
        >
            <div
                className="border-none flex justify-between text-ellipsis p-0 ml-3 pl-2 h-10"
                style={{
                    backgroundColor: "hsl(var(--bc) / var(--tw-bg-opacity))",
                    "--tw-bg-opacity": isSelected ? "0.3" : "0",
                    "&:hover": {
                        backgroundColor:
                            "hsl(var(--bc) / var(--tw-bg-opacity))",
                        "--tw-bg-opacity": "0.1",
                    },
                }}
            >
                <div className="indicator">
                    <span className="indicator-item indicator-middle badge">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-users mr-1"
                            width="13"
                            height="13"
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
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                        </svg>
                        <div className="text-white">
                            {!isSelected ? room.in_room : selectedInRoomCount}
                        </div>
                    </span>
                    <div className="mr-7">{room.name}</div>
                </div>
            </div>
        </li>
    );
};

export default Sidebar;
