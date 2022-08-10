import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  /*process.env.STAGE == "prod"
      ? process.env.API_BASE_URL
      : "http://localhost:3000/api/v1"*/ timeout: 10000,
});

export default instance;
