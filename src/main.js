import "./Sidebar.css";
import "./main.css"
import Drawer from "./Drawer";
import ChannelSettings from "./ChannelSettings";
import CreateChannel from "./CreateChannel";
import CreateRoom from "./CreateRoom";
import MeetingRoom from "./MeetingRoom";

export function Main() {
    return (
        <div className="flex">
            <Drawer />
            <ChannelSettings />
            <CreateChannel />
            <CreateRoom />
            <MeetingRoom />
        </div>
            
    );
}

export default Main;