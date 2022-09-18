import axios from "axios";

const instance = axios.create({
  baseURL: "https://web-tau-liart.vercel.app/api/v1",
  timeout: 10000,
});

export default instance;
