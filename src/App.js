import Login from "./login";
import {
    BrowserRouter as Router,
    Navigate,
    Outlet,
    Route,
    Routes,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import Main from "./main";
import axiosInstance from "./api/axios";
import { useEffect } from "react";
import axios from "axios";
function App() {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<ProtectedRoute />}>
                    <Route exact path="/" element={<Main />} />
                </Route>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/invite/:code" element={<InviteLink />} />
            </Routes>
        </>
    );
}

const InviteLink = () => {
    const authenticated = localStorage.getItem("access_token");
    const prevLocation = useLocation();
    const navigate = useNavigate();
    let { code } = useParams();
    useEffect(() => {
        if (!authenticated || !code) {
            console.log(prevLocation);
            navigate(`/login?redirectTo=${prevLocation.pathname}`);
        } else {
            axiosInstance
                .post(`/invite/${code}`)
                .then(navigate("/"))
                .catch((e) => console.log(e));
        }
    }, [code, authenticated, navigate, prevLocation]);

    return <Navigate to="/" />;
};

const ProtectedRoute = () => {
    const authenticated = localStorage.getItem("access_token");

    return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default App;
