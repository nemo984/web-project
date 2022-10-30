import React from "react";

const Settings = () => {
    return (
        <>
            <input type="checkbox" id="my-setting" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-4xl text-lg">
                        Setting
                    </h3>
                    <h3 className="font-bold text-lg">
                        Input device
                    </h3>
                    <select className="select w-full max-w-xs">
                        <option disabled selected>Pick your input device</option>
                        <option>Default</option>
                        <option>Microphone1</option>
                        <option>Microphone2</option>
                    </select>
                    <h3 className="font-bold text-lg">
                        Output device
                    </h3>
                    <select className="select w-full max-w-xs">
                        <option disabled selected>Pick your output device</option>
                        <option>Default</option>
                        <option>Speaker1</option>
                        <option>Speaker2</option>
                    </select>
                    <h3 className="font-bold text-lg">
                        Input volume
                    </h3>
                    <input type="range" min="0" max="100" className="range" />
                    <h3 className="font-bold text-lg">
                        Output volume
                    </h3>
                    <input type="range" min="0" max="100" className="range" />
                    <h3 className="font-bold text-lg">
                        Camera
                    </h3>
                    <select className="select w-full max-w-xs">
                        <option disabled selected>Pick your camera</option>
                        <option>Default</option>
                        <option>Camera1</option>
                        <option>Camera2</option>
                    </select>
                    <h3 className="font-bold text-lg">
                        Virtual background
                    </h3>
                    <select className="select w-full max-w-xs">
                        <option disabled selected>Pick your camera</option>
                        <option>Default</option>
                        <option>1</option>
                        <option>2</option>
                    </select>
                    <div className="modal-action">
                        <label htmlFor="my-setting" className="btn">
                            Close
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;