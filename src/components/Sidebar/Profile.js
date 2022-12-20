import React, { useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserSettings from "../Popup/UserSettings";

const Profile = () => {
    const [userInfo, setUserInfo] = useState({});

    const getProfile = async () => {
        const userInfo = await axios
            .get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "google_access_token"
                    )}`,
                },
            })
            .then((res) => res.data);
        setUserInfo(userInfo);
    };

    useEffect(() => {
        localStorage.getItem("google_access_token") && getProfile();
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        googleLogout();
        navigate("/login");
    };

    return (
        <div className="dropdown mb-3 flex">
            <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar h-full ring ring-primary ring-offset-base-100 ring-offset-2"
            >
                <div className="w-16 rounded-full">
                    <img
                        src={userInfo?.picture}
                        alt="profile pic"
                        referrerPolicy="no-referrer"
                        className="h-full w-full"
                    />
                </div>
            </label>
            <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
                <li>
                    <UserSettings />
                </li>
                <li onClick={handleLogout}>
                    <button>Logout</button>
                </li>
            </ul>
            <div className="ml-5 mt-2 text-xl text-secondary">
                {userInfo?.name}
            </div>
        </div>
    );
};

export default Profile;
