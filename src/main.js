import Drawer from "./Drawer";
import MeetingRoom from "./MeetingRoom";
import Settings from "./Setting";

export function Main() {
    return (
        <div className="flex">
            <Drawer />
            <MeetingRoom />
        </div>
    );
}

export default Main;
