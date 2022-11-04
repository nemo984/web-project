import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";

const ChannelSettings = () => {
    const inviteLink = "localhost:3000/afjafakjfa";

    return (
        <>
            <input
                type="checkbox"
                id="channel-settings"
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box p-0 h-96">
                    <label
                        htmlFor="channel-settings"
                        className="absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <Tabs>
                        <TabList>
                            <Tab>
                                <p>General</p>
                            </Tab>
                            <Tab>
                                <p>Members</p>
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <div className="panel-content">
                                <h2>
                                    <div>Channel name</div>
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered w-full max-w-xs"
                                        />
                                        <button className="btn">change</button>
                                    </div>
                                    <br />
                                    <div>Slow mode</div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        className="range"
                                        step="2"
                                    />
                                    <div className="w-full flex justify-between text-xs px-2">
                                        <span>0</span>
                                        <span>2</span>
                                        <span>4</span>
                                        <span>6</span>
                                        <span>8</span>
                                        <span>10</span>
                                    </div>
                                    <br />
                                    <div>
                                        <button className="btn btn-ghost btn-xs">
                                            Delete channel
                                        </button>
                                    </div>
                                </h2>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="panel-content">
                                <Popup
                                    trigger={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="icon icon-tabler icon-tabler-user-plus cursor-pointer"
                                            width="50"
                                            height="40"
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
                                            <circle
                                                cx="9"
                                                cy="7"
                                                r="4"
                                            ></circle>
                                            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                                            <path d="M16 11h6m-3 -3v6"></path>
                                        </svg>
                                    }
                                    position="right center"
                                >
                                    <div className="rounded-xl min-w-max bg-white">
                                        <h3 className="font-bold text-lg">
                                            Invite Members
                                        </h3>
                                        <p className="text-base font-medium">
                                            Invite Link
                                        </p>
                                        <input
                                            className="border-blue-500 border-solid border py-2 px-4 caret-transparent text-gray-800"
                                            type="text"
                                            placeholder="Invite Link"
                                            id="copyMe"
                                            value={inviteLink}
                                            spellcheck="false"
                                            readonly
                                        />
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    inviteLink
                                                );
                                            }}
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </Popup>
                                <MembersTable />
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

const MembersTable = () => {
    const members = [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
    ];

    return (
        <div className="overflow-x-auto">
            <table className="table w-1/2">
                <caption className="font-semibold">Members</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((v, i) => (
                        <tr key={i}>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img
                                                src="/tailwind-css-component-profile-2@56w.png"
                                                alt="Avatar Tailwind CSS Component"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">
                                            Hart Hagerty
                                        </div>
                                        <div className="text-sm opacity-50">
                                            United States
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Zemlak, Daniel and Leannon
                                <br />
                                <span className="badge badge-ghost badge-sm">
                                    Desktop Support Technician
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <div className="btn-group">
                        <button className="btn btn-active">1</button>
                        <button className="btn">2</button>
                        <button className="btn">3</button>
                        <button className="btn">4</button>
                    </div>
                </tfoot>
            </table>
        </div>
    );
};

export default ChannelSettings;
