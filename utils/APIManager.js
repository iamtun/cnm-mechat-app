import axios from "axios";

const API = axios.create({
    baseURL:"https://back-end-me-chat-final.vercel.app/api/v1",
    responseType:"json",
    withCredentials: true
})

export default API;