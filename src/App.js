import Login from "./login";
import {
    BrowserRouter as Router,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import Main from "./main";
function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<ProtectedRoute />}>
                    <Route exact path="/" element={<Main />} />
                </Route>
                <Route exact path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

const ProtectedRoute = () => {
    const authenticated = localStorage.getItem("access_token");

    return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default App;
