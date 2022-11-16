import React, { useMemo } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/axios";
import ToolTip from "../common/ToolTip";

const ChannelSettings = ({ channel, removeChannel }) => {
    return (
        <>
            <Popup
                trigger={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer"
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
                }
                modal
                nested
            >
                <div className="p-0 h-[32rem]">
                    <Tabs class>
                        <TabList>
                            <Tab>
                                <p>General</p>
                            </Tab>
                            <Tab>
                                <p>Members</p>
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <GeneralTab
                                channel={channel}
                                removeChannel={removeChannel}
                            />
                        </TabPanel>
                        <TabPanel>
                            <MembersTab channel={channel} />
                        </TabPanel>
                    </Tabs>
                </div>
            </Popup>
        </>
    );
};

const GeneralTab = ({ channel, removeChannel }) => {
    const handleDeleteChannel = async () => {
        await axiosInstance.delete(`/channels/${channel.id}/`);
        removeChannel(channel.id);
    };

    const handleLeaveChannel = async () => {
        await axiosInstance.post(`/me/channels/${channel.id}/leave/`);
        removeChannel(channel.id);
    };

    return (
        <div className="panel-content">
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
            <div className="flex justify-between p-5 absolute bottom-0">
                <button
                    className="btn btn-ghost btn-lg bg-red-700 text-secondary"
                    onClick={handleDeleteChannel}
                >
                    Delete Channel
                </button>
                <button
                    className="btn btn-ghost btn-lg bg-primary text-secondary"
                    onClick={handleLeaveChannel}
                >
                    Leave Channel
                </button>
            </div>
        </div>
    );
};

const MembersTab = ({ channel }) => {
    const inviteLink = `${window.location.host}/invite/${channel.invite_code}`;

    return (
        <div className="panel-content">
            <ToolTip text="Get Invite Link">
                <Popup
                    trigger={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-user-plus cursor-pointer mt-3"
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
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                            <path d="M16 11h6m-3 -3v6"></path>
                        </svg>
                    }
                    position="right center"
                >
                    {(close) => (
                        <div className="rounded-xl min-w-max bg-white">
                            <h3 className="font-bold text-lg">
                                Invite Members
                            </h3>
                            <p className="text-base font-medium">Invite Link</p>
                            <input
                                className="border-blue-500 border-solid border py-2 px-4 caret-transparent text-gray-800"
                                type="text"
                                placeholder="Invite Link"
                                id="copyMe"
                                value={inviteLink}
                                spellcheck="false"
                                onFocus={(event) => event.target.select()}
                                readOnly
                            />
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                                onClick={() => {
                                    navigator.clipboard.writeText(inviteLink);
                                    close();
                                }}
                            >
                                Copy
                            </button>
                        </div>
                    )}
                </Popup>
            </ToolTip>

            <MembersTable members={channel.members} />
        </div>
    );
};

const MembersTable = ({ members }) => {
    return (
        <div className="overflow-y-scroll max-h-96 w-full scrollbar scrollbar-thumb-gray-500 scrollbar-track-primary">
            <table className="table w-full">
                <caption className="font-bold">Members</caption>
                <thead className="bg-primary">
                    <tr className="font-semibold">
                        <th>Joined Date</th>
                        <th>Name</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member, i) => (
                        <tr key={i}>
                            <td>
                                {new Date(
                                    member.join_date
                                ).toLocaleDateString()}
                            </td>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div>
                                        <div className="font-bold">
                                            {member.user.first_name}{" "}
                                            {member.user.last_name}
                                        </div>
                                        <div className="text-sm opacity-50">
                                            {member.user.email}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="badge badge-ghost badge-sm text-center">
                                    {member.role}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ChannelSettings;
