import axios from "axios";

export const getAuthorizationHeader = () =>
    `Bearer ${localStorage.getItem("access_token")}`;

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_DJANGO_URL,
    timeout: 5000,
    headers: {
        Authorization: getAuthorizationHeader(),
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
