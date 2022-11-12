import React from "react";
import Popup from "reactjs-popup";
import axiosInstance from "./api/axios";

const CreateRoom = ({ addRoom, channelId }) => {
    const roomNameInputRef = React.useRef();

    const createRoom = async () => {
        const res = await axiosInstance.post("/rooms/", {
            name: roomNameInputRef.current.value,
            channel: channelId,
        });
        addRoom(res.data);
    };

    return (
        <Popup
            trigger={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-plus cursor-pointer"
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
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            }
            contentStyle={{ borderRadius: "20px", maxWidth: "32rem" }}
            modal
        >
            {(close) => (
                <div>
                    <div className="w-full h-full p-2">
                        <div className="w-full p-0">
                            <p className="text-2xl font-extrabold text-lg grid justify-items-center">
                                Create Room
                            </p>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">
                                        ROOM NAME
                                    </span>
                                </label>
                                <label className="input-group">
                                    <input
                                        ref={roomNameInputRef}
                                        type="text"
                                        className="input input-bordered w-full"
                                    />
                                </label>
                            </div>
                            <div className="modal-action">
                                <label
                                    className="btn grid justify-items-start"
                                    onClick={close}
                                >
                                    Close
                                </label>
                                <label
                                    className="btn"
                                    onClick={() => {
                                        createRoom();
                                        close();
                                    }}
                                >
                                    Create
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default CreateRoom;
