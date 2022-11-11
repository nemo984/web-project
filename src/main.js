import Drawer from "./Drawer";
import CreateRoom from "./CreateRoom";
import MeetingRoom from "./MeetingRoom";
import ChannelSettings from "./components/ChannelSettings";
import Settings from "./Setting";

export function Main() {
    return (
        <div className="flex">
            <Drawer />
            <Settings />
            <ChannelSettings />
            <CreateRoom />
            <MeetingRoom />
        </div>
    );
}

export default Main;
