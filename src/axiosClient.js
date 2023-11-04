import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export default axiosClient;
