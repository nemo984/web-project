import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { joinRoom } from "./features/room/roomSlice";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./api/axios";
import axios from "axios";
import CreateChannel from "./CreateChannel";

const Drawer = () => {
    // get from api
    const [channels, setChannels] = useState([]);

    const getChannels = () => {
        axiosInstance()
            .get("/me/channels/")
            .then((res) => setChannels(res.data))
            .catch(console.error);
    };

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
                            {channels.map((channel, i) => (
                                <Channel key={i} channel={channel} />
                            ))}

                            <CreateChannel getChannels={getChannels} />
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
                    <label htmlFor="my-setting">Settings</label>
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

const Channel = ({ channel }) => {
    return (
        <div
            className="collapse collapse-arrow text-secondary font-light
        "
        >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
                <div className="flex justify-between">{channel.name}</div>
            </div>

            <label htmlFor="channel-settings" className="inline-block">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-settings"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            </label>
            <div className="collapse-content">
                {channel.rooms.map((room, i) => (
                    <Room key={i} room={room} />
                ))}
            </div>
        </div>
    );
};

const Room = ({ room }) => {
    const dispatch = useDispatch();
    const [roomToken, setRoomToken] = useState("");

    return (
        <li onClick={() => dispatch(joinRoom())}>
            <div className="flex justify-between">
                <div className="indicator">
                    <span className="indicator-item badge badge-secondary">
                        5
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
