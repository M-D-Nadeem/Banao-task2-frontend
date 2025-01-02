import axios from "axios";

const axiosInstance=axios.create()

// axiosInstance.defaults.baseURL="http://localhost:7002/api"
axiosInstance.defaults.baseURL="https://banao-task2-backend.onrender.com/api"
axiosInstance.defaults.withCredentials=true

export default axiosInstance