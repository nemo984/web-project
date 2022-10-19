import Sidebar from "./Sidebar";
import Room from "./components/Room";
import "./App.css";
import Main from "./main";

function App() {
    return (
        <div className="app">
            <Sidebar />
            <Room />
        </div>
    );
}

export default App;
