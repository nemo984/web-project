import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinRoom, leaveRoom } from "./features/room/roomSlice";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./api/axios";
import axios from "axios";
import CreateChannel from "./CreateChannel";
import { Collapse } from "react-collapse";
import ToolTip from "./common/ToolTip";
import CreateRoom from "./CreateRoom";
import ChannelSettings from "./components/ChannelSettings";
import { useInterval } from "./hooks/useInterval";
import jwt_decode from "jwt-decode";
import Settings from "./Setting";

const Drawer = () => {
    const [channels, setChannels] = useState([]);

    const addChannel = (channel) => {
        setChannels((prevState) => [...prevState, channel]);
    };

    const removeChannel = (channelId) => {
        setChannels((channels) => channels.filter((c) => c.id !== channelId));
    };

    const getChannels = () => {
        axiosInstance.get("/me/channels/").then((res) => setChannels(res.data));
    };

    useInterval(() => {
        getChannels();
    }, 10000);

    useEffect(() => {
        getChannels();
    }, []);

    return (
        <>
            <div className="drawer max-w-md">
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
                        className="menu p-4 overflow-y-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 
 bg-base-100 text-base-content bg-primary flex flex-col justify-between"
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
                    <Settings />
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

const Channel = ({ channel, removeChannel }) => {
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

const Room = ({ room, isSelected }) => {
    const selectedInRoomCount = useSelector(
        (state) => state.room.selectedRoomInCount
    );

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
                getRoomToken().then((token) => {
                    dispatch(leaveRoom());
                    dispatch(joinRoom({ token, room }));
                });
            }}
        >
            <div
                className="border-none flex justify-between text-ellipsis p-0 ml-3 pl-2"
                style={{
                    backgroundColor: "hsl(var(--bc) / var(--tw-bg-opacity))",
                    "--tw-bg-opacity": isSelected ? "0.3" : "0",
                    "&:hover": {
                        // TODO: bug
                        backgroundColor:
                            "hsl(var(--bc) / var(--tw-bg-opacity))",
                        "--tw-bg-opacity": "0.1",
                    },
                }}
            >
                <div className="indicator">
                    <span className="indicator-item badge badge-secondary">
                        {!isSelected ? room.in_room : selectedInRoomCount}
                    </span>
                    {room.name}
                </div>

                <button
                    className="btn btn-square btn-ghost"
                    onClick={(e) => e.stopPropagation()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        ></path>
                    </svg>
                </button>
            </div>
        </li>
    );
};

export default Drawer;
