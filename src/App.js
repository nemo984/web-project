//import ChannelRoom from "./components/ChannelRoom";
import "./App.css";
import Login from "./login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./main";

function App() {
    return (
        <Routes>
            <Route index path="/Login" element={<Login />} />
            <Route path="/home" element={<Main />}></Route>
        </Routes>
    );
}

export default App;
