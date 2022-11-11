import React from "react";
import { useDispatch } from "react-redux";
import Popup from "reactjs-popup";
import axiosInstance from "./api/axios";

const CreateChannel = ({ getChannels }) => {
    const channelNameInputRef = React.useRef();

    const createChannel = async () => {
        const axios = axiosInstance();
        try {
            const res = await axios.post("/channels/", {
                name: channelNameInputRef.current.value,
            });
            await axios.post("/rooms/", {
                name: "Default",
                channel: res.data.id,
            });
            getChannels();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Popup
            trigger={
                <div className="w-full h-24 bg-transparent grid justify-items-stretch">
                    <label className="btn justify-self-end bg-Hover rounded-full">
                        +
                    </label>
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
                                <label
                                    className="btn grid justify-items-start"
                                    onClick={close}
                                >
                                    Close
                                </label>
                                <label
                                    className="btn"
                                    onClick={() => {
                                        createChannel();
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

export default CreateChannel;
