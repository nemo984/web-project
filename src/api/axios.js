import axios from "axios";

export const getAuthorizationHeader = () => {
    const token = localStorage.getItem("access_token");
    return token ? `Bearer ${token}` : "";
};

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_DJANGO_URL,
    timeout: 5000,
    headers: {
        Authorization: getAuthorizationHeader(),
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = getAuthorizationHeader();
    return config;
});

export default axiosInstance;
