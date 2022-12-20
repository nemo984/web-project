import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Collapse } from "react-collapse";
import ToolTip from "../common/ToolTip";
import CreateRoom from "../Popup/CreateRoom";
import ChannelSettings from "../Popup/ChannelSettings";
import Room from "./Room";

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

export default Channel;
