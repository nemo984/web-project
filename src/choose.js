import React from "react";

const Choose = () => {
    return (
        <>
            <input type="checkbox" id="choose" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="choose" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <p className="text-2xl font-extrabold text-lg grid justify-items-center">
                        Create Channel
                    </p>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Create new Channel</span>
                        </label>
                        <label htmlFor="Create-Channel" className="btn justify-self-end bg-Hover">Create</label>
                        <label className="label">
                            <span className="label-text font-bold">Join existing Channel</span>
                        </label>
                        <label htmlFor="" className="btn justify-self-end bg-Hover">Join</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Choose;