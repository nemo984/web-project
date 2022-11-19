import React from "react";
import Popup from "reactjs-popup";
import axiosInstance from "./api/axios";

const CreateChannel = ({ addChannel }) => {
    const channelNameInputRef = React.useRef();

    const createChannel = async () => {
        const channelName = channelNameInputRef.current.value;

        const channelRes = await axiosInstance.post("/channels/", {
            name: channelName,
        });
        const channel = channelRes.data;
        const roomRes = await axiosInstance.post("/rooms/", {
            name: "Default",
            channel: channel.id,
        });
        channel.rooms.push(roomRes.data);
        addChannel(channel);
    };

    return (
        <Popup
            trigger={
                <div className="btn bg-Hover rounded-full w-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="rounded-full"
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
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </div>
            }
            contentStyle={{ borderRadius: "20px", maxWidth: "32rem" }}
            modal
        >
            {(close) => (
                <div>
                    <div className="w-full h-full p-2">
                        <div className="w-full p-0">
                            <p className="text-2xl font-extrabold text-lg grid justify-items-center">
                                Create Channel
                            </p>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    createChannel();
                                    close();
                                }}
                            >
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-bold">
                                            CHANNEL NAME
                                        </span>
                                    </label>
                                    <label className="input-group">
                                        <input
                                            ref={channelNameInputRef}
                                            type="text"
                                            className="input input-bordered w-full"
                                        />
                                    </label>
                                </div>
                                <div className="modal-action">
                                    <button
                                        className="btn grid justify-items-start"
                                        onClick={close}
                                        type="button"
                                    >
                                        Close
                                    </button>
                                    <button className="btn" type="submit">
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default CreateChannel;
