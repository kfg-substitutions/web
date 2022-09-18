import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_APP_STAGE == "LIVE"
      ? process.env.VERCEL_URL + "/api/v1"
      : "http://localhost:3000/api/v1",
  timeout: 10000,
});

export default instance;
