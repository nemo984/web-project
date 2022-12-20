import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/axios";
import ToolTip from "../common/ToolTip";
import { useRef } from "react";

const RoomSettings = ({ room }) => {
    return (
        <>
            <Popup
                trigger={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-caret-right"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                        ></path>
                        <path d="M10 18l6 -6l-6 -6v12"></path>
                    </svg>
                }
                modal
            >
                {(close) => (
                    <div className="p-0 h-[32rem]">
                        <Tabs class>
                            <TabList>
                                <Tab>
                                    <p>General</p>
                                </Tab>
                                <Tab>
                                    <p>Members</p>
                                </Tab>
                            </TabList>
                            <TabPanel></TabPanel>
                            <TabPanel></TabPanel>
                        </Tabs>
                    </div>
                )}
            </Popup>
        </>
    );
};

export default RoomSettings;
