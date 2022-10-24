import Sidebar from "./Sidebar";
//import ChannelRoom from "./components/ChannelRoom";
import "./App.css";
import Main from "./main";
import Drawer from "./Drawer";
import MeetingRoom from "./MeetingRoom";
import ChannelSettings from "./ChannelSettings";

function App() {
    return (
        <div className="app">
            <Drawer />
            <ChannelSettings />
            <MeetingRoom />
            {/* <Sidebar /> */}
            {/*<ChannelRoom /> */}
        </div>
    );
}

export default App;
