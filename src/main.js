import Drawer from "./Drawer";
import CreateChannel from "./CreateChannel";
import CreateRoom from "./CreateRoom";
import MeetingRoom from "./MeetingRoom";
import ChannelSettings from "./components/ChannelSettings/ChannelSettings";
import Settings from "./Setting";

export function Main() {
    return (
        <div className="flex">
            <Drawer />
            <Settings />
            <ChannelSettings />
            <CreateChannel />
            <CreateRoom />
            <MeetingRoom />
        </div>
    );
}

export default Main;
