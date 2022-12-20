import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeRoom, joinRoom, leaveRoom } from "../../features/roomSlice";
import axiosInstance from "../../api/axios";
import { timeout } from "./Sidebar";
import "./drawer.css";
import ChannelSettings from "../Popup/ChannelSettings";
import RoomSettings from "../Popup/RoomSettings";

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
                className={
                    "border-none hover:bg-cyan-700 flex justify-between text-ellipsis p-3 ml-3 pl-2 h-10 " +
                    (isSelected ? "bg-cyan-900" : "")
                }
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
                <RoomSettings />
            </div>
        </li>
    );
};

export default Room;
