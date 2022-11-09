import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_DJANGO_URL,
    timeout: 5000,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
        accept: "application/json",
    },
});

export default axiosInstance;
