import React from "react";
import axiosInstance, { getAuthorizationHeader } from "./api/axios";

const CreateChannel = () => {
    const channelNameInputRef = React.useRef();

    const createChannel = () => {
        axiosInstance.post(
            "/channels/",
            { name: channelNameInputRef.current.value },
            {
                headers: { Authorization: getAuthorizationHeader() },
            }
        );
    };

    return (
        <>
            <input
                type="checkbox"
                id="Create-Channel"
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box">
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
                            htmlFor="Create-Channel"
                            className="btn grid justify-items-start"
                        >
                            Close
                        </label>
                        <label
                            htmlFor="Create-Channel"
                            className="btn"
                            onClick={createChannel}
                        >
                            Create
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateChannel;
