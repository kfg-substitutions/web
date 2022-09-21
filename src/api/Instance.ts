import axios from "axios";

// if we fucking hard code this dogshit
// it will work

// BUT like this it wont
// and i also hate niggers

console.error(
  process.env.APP_NEXT_PUBLIC_APP_STAGE,
  process.env.VERCEL_URL,
  "https://" + process.env.VERCEL_URL + "/api/v1",
  "http://localhost:3000/api/v1",
  process.env.APP_NEXT_PUBLIC_APP_STAGE == "LIVE"
    ? "https://" + process.env.VERCEL_URL + "/api/v1"
    : "http://localhost:3000/api/v1"
);

const instance = axios.create({
  baseURL:
    process.env.APP_NEXT_PUBLIC_APP_STAGE == "LIVE"
      ? "https://" + process.env.VERCEL_URL + "/api/v1"
      : "http://localhost:3000/api/v1",
  timeout: 10000,
});

export default instance;
