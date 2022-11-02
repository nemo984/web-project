import Drawer from "./Drawer";
import CreateChannel from "./CreateChannel";
import CreateRoom from "./CreateRoom";
import MeetingRoom from "./MeetingRoom";

export function Main() {
    return (
        <div className="flex">
            <Drawer />
            <CreateChannel />
            <CreateRoom />
            <MeetingRoom />
        </div>
            
    );
}

export default Main;