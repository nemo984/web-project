import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/axios";
import ToolTip from "../common/ToolTip";
import { useRef } from "react";

const ChannelSettings = ({ channel, removeChannel, editChannel }) => {
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
                {(close) => (
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
                                    editChannel={editChannel}
                                    close={close}
                                />
                            </TabPanel>
                            <TabPanel>
                                <MembersTab channel={channel} />
                            </TabPanel>
                        </Tabs>
                    </div>
                )}
            </Popup>
        </>
    );
};

const GeneralTab = ({ channel, removeChannel, editChannel, close }) => {
    const newNameInputRef = useRef();

    const handleDeleteChannel = async () => {
        close();
        await axiosInstance.delete(`/channels/${channel.id}/`);
        removeChannel(channel.id);
    };

    const handleLeaveChannel = async () => {
        close();
        await axiosInstance.post(`/me/channels/${channel.id}/leave/`);
        removeChannel(channel.id);
    };

    const handleChangeChannelName = (e) => {
        e.preventDefault();
        axiosInstance
            .patch(`/channels/${channel.id}/`, {
                name: newNameInputRef.current.value,
            })
            .then((res) => {
                newNameInputRef.current.value = "";
                editChannel(res.data);
            });
    };

    return (
        <div className="panel-content m-2">
            <div className="mt-7 flex justify-around">
                <div>
                    <div className="font-semibold text-xl">Created: </div>
                    <div className="mb-3 text-lg">
                        {new Date(channel.created).toLocaleString()}
                    </div>
                    <div className="font-semibold text-xl">Channel name:</div>
                    <div className="text-lg mb-3">{channel.name}</div>
                    <div className="font-semibold text-xl"># of Rooms: </div>
                    <div className="mb-3 text-lg">{channel.rooms.length}</div>
                    <div className="font-semibold text-xl"># of Members: </div>
                    <div className="mb-3 text-lg">{channel.members.length}</div>
                </div>
                <div>
                    <form onSubmit={handleChangeChannelName}>
                        <label className="label">
                            <span className="label-text font-semibold">
                                Change Channel Name
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="New channel name"
                            className="input input-bordered min-w-xl mr-2"
                            ref={newNameInputRef}
                        />

                        <button className="btn" type="submit">
                            change
                        </button>
                    </form>
                </div>
            </div>

            <div className="flex w-full justify-between p-5 absolute bottom-0 right-0">
                <button
                    className="btn btn-lg bg-red-700 text-secondary"
                    onClick={handleDeleteChannel}
                >
                    Delete Channel
                </button>
                <button
                    className="btn btn-lg bg-primary text-secondary"
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
                                spellCheck="false"
                                onFocus={(event) => event.target.select()}
                                readOnly
                            />
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                                onClick={() => {
                                    navigator.clipboard.writeText(inviteLink);
                                    close();
                                    toast.info(
                                        "Successfully copied invite link",
                                        {
                                            position: "top-center",
                                            autoClose: 1000,
                                            hideProgressBar: true,
                                        }
                                    );
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
