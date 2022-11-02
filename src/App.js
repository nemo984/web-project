//import ChannelRoom from "./components/ChannelRoom";
import "./App.css";
import Drawer from "./Drawer";
import MeetingRoom from "./MeetingRoom";
import ChannelSettings from "./components/ChannelSettings/ChannelSettings";
import CreateChannel from "./CreateChannel";
import CreateRoom from "./CreateRoom";
import Choose from "./choose";
import Login from "./login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./main";
import Settings from "./Setting";

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path='/Login' element={<Login />} />
                <Route path="/Home" element={<Main />} />

                {/* <ChannelSettings /> */}
                {/* <Settings /> */}
                {/* <CreateChannel />
                    <CreateRoom />
                    <Choose />
                    <MeetingRoom />
                    <ChannelRoom /> */}
            </Routes>


        </div>
    );
}

function Chat() {
    return (
        <>
            <div className="drawer drawer-end">
                <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                    defaultChecked={true}
                />
                <div className="drawer-content">
                    <label
                        htmlFor="my-drawer-4"
                        className="drawer-button btn btn-primary"
                    >
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-4"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        <li>
                            <a>Sidebar Item 1</a>
                        </li>
                        <li>
                            <a>Sidebar Item 2</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default App;
