import Login from "./components/Login";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

import Main from "./components/Main";
import axiosInstance from "./api/axios";
import { useEffect } from "react";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute />}>
                    <Route path="/" element={<Main />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/invite/:code" element={<InviteLink />} />
            </Routes>
        </BrowserRouter>
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
