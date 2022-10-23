import React from "react";

const Drawer = () => {
    return (
        <>
            <div className="drawer">
                <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    <label
                        htmlFor="my-drawer"
                        className="btn btn-primary drawer-button"
                    >
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs"
                        />
                        <Channel name={"Web Programming"} />
                        <Channel name={"Artificial Unintelligent"} />
                    </ul>
                </div>
            </div>
        </>
    );
};

const Channel = ({ name }) => {
    return (
        <div className="collapse collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">{name}</div>
            <div className="collapse-content">
                <Room name={"Default Meeting"} />
                <Room name={"AFK"} />
            </div>
        </div>
    );
};

const Room = ({ name }) => {
    return (
        <li>
            <div>
                {name}
                <button className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        ></path>
                    </svg>
                </button>
            </div>
        </li>
    );
};

export default Drawer;
