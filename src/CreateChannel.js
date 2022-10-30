import React from "react";

const CreateChannel = () => {
    return (
        <>
            <input type="checkbox" id="Create-Channel" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <p className="text-2xl font-extrabold text-lg grid justify-items-center">
                        Create Channel
                    </p>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">CHANNEL NAME</span>
                        </label>
                        <label className="input-group">
                            <input type="text" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="Create-Channel" className="btn grid justify-items-start">
                            Close
                        </label>
                        <label htmlFor="Create-Channel" className="btn">
                            Create
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateChannel;
