import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_STAGE == "LIVE"
      ? process.env.NEXT_PUBLIC_API_BASE_URL
      : "http://localhost:3000/api/v1",
  timeout: 10000,
});

export default instance;
