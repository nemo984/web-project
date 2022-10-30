import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./styles.css";

const ChannelSettings = () => {
    return (
        <>
            <input
                type="checkbox"
                id="channel-settings"
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box p-0 h-96">
                    <label
                        htmlFor="channel-settings"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <Tabs>
                        <TabList className="bg-primary text-secondary h-full w-[300rem] text-center">
                            <Tab>
                                <p>General</p>
                            </Tab>
                            <Tab>
                                <p>Members</p>
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <div className="panel-content">
                                <h2>Any content 1</h2>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="panel-content">
                                <h2>Any content 2</h2>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default ChannelSettings;
