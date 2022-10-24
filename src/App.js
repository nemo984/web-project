import Sidebar from "./Sidebar";
import Room from "./components/Room";
import "./App.css";
import Main from "./main";
import Drawer from "./Drawer";

function App() {
    return (
        <div className="app">
            <Drawer/>
            {/* <Sidebar /> */}
            <Room />
        </div>
    );
}

export default App;
