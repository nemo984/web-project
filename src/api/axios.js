import axios from "axios";
import { toast } from "react-toastify";

export const getAuthorizationHeader = () => {
    const token = localStorage.getItem("access_token");
    return token ? `Bearer ${token}` : "";
};

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_DJANGO_URL,
    timeout: 10000,
    headers: {
        Authorization: getAuthorizationHeader(),
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = getAuthorizationHeader();
    return config;
});

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const err = JSON.stringify(error?.response?.data ?? error.message);
        toast.error(JSON.stringify(err));
        return Promise.reject(error);
    }
);

export default axiosInstance;
