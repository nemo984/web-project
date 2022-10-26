import React, { useState } from "react";

const Drawer = () => {
    // get from api
    const [channels, setChannels] = useState([
        {
            name: "Web Programming",
            rooms: [{ name: "Default" }, { name: "AFK" }],
        },
        {
            name: "Artificial Unintelligent",
            rooms: [
                { name: "Default" },
                { name: "AFK" },
                { name: "Freestyle" },
            ],
        },
        {
            name: "Advanced Wallpaper Design",
            rooms: [],
        },
        {
            name: "Shirt",
            rooms: [
                {
                    name: "Default",
                },
            ],
        },
    ]);

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
                        className="menu p-4 overflow-y-auto 
 bg-base-100 text-base-content bg-primary flex flex-col justify-between"
                    >
                        <div>
                            <Profile />
                            <input
                                type="text"
                                placeholder="Search Room or Channel"
                                className="input input-bordered w-full"
                            />
                            {channels.map((channel, i) => (
                                <Channel key={i} channel={channel} />
                            ))}
                        </div>
                        <div className="w-full h-24 bg-secondary grid justify-items-stretch">
                            <label htmlFor="Create-Channel" className="btn justify-self-end bg-Hover">+</label>
                            <p>FF</p>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
};

//TODO: put components into each js file
const Profile = () => {
    return (
        <div className="dropdown mb-3">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-full rounded-full">
                    <img src="https://placeimg.com/80/80/people" />
                </div>
            </label>
            <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
                <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </a>
                </li>
                <li>
                    <a>Settings</a>
                    <label htmlFor="my-modal" className="btn modal-button">
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
                            <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                            ></path>
                            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </label>
                </li>
                <li>
                    <a>Logout</a>
                </li>
            </ul>
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
            <div className="collapse-content">
                {channel.rooms.map((room, i) => (
                    <Room key={i} room={room} />
                ))}
            </div>
        </div>
    );
};

const Room = ({ room }) => {
    return (
        <li>
            <div>
                {room.name}
                <button className="btn btn-square btn-ghost">
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
