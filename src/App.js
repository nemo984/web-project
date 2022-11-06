import Login from "./login";
import {
    BrowserRouter as Router,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import Main from "./main";
import { Fragment } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
    return (
        <GoogleOAuthProvider clientId="318942319232-dbviqk9k6g9s83pmqnt7lsvedf8ods9s.apps.googleusercontent.com">
            <Routes>
                <Route exact path="/" element={<ProtectedRoute />}>
                    <Route exact path="/" element={<Main />} />
                </Route>
                <Route exact path="/login" element={<Login />} />
            </Routes>
        </GoogleOAuthProvider>
    );
}

const ProtectedRoute = () => {
    const authenticated = false;

    return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default App;
