import axios from "axios";

const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_URL,
    baseURL: "http://localhost:8080",
    withCredentials: true
})
instance.interceptors.response.use(
    (response) => {
        return response.data;
    }
)

export default instance;